import { useConfig } from '@/features/config/hooks/useConfig';
import { useLazyGetOfficesQuery } from '@/features/office/api/officeApi';
import { useLazyGetServicesQuery } from '@/features/service/api/serviceApi';
import { ICreateVisitorLogPayload } from '@/features/visitors/api/interface';
import {
  useLazyGetAllAvailableVisitorsQuery,
  useLazyGetVisitorsReturnedQuery,
  useLazyGetVisitorsTodaysQuery,
  useSignInVisitorLogMutation,
  useUploadVisitorImagesMutation,
} from '@/features/visitors/api/visitorApi';
import { IFormData } from '@/features/visitors/types/visitorTypes';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { resetVisitorFormData, setVisitorFormData } from '@/lib/redux/state/visitorFormSlice';
import { setCardImageId, setFaceImageId } from '@/lib/redux/state/visitorSlice';
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';

export const useSignInScreen = () => {
  const dispatch = useAppDispatch();

  const formData = useAppSelector(state => state.visitorForm.formData);

  const { faceImageId, cardImageId } = useAppSelector(state => state.visitor);
  const { ipAddress, port } = useAppSelector(state => state.config);

  const [getOffices, { data: offices }] = useLazyGetOfficesQuery();
  const [getServices, { data: services }] = useLazyGetServicesQuery();
  const [getVisitorsReturned, { data: visitorsReturned }] = useLazyGetVisitorsReturnedQuery();
  const [getVisitorsTodays, { data: visitorsTodays }] = useLazyGetVisitorsTodaysQuery();
  const [getAllAvailableVisitors, { data: visitors }] = useLazyGetAllAvailableVisitorsQuery();

  // Fetch fresh data whenever screen comes into focus
  const fetchAllData = useCallback(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    getOffices();
    getServices();
    getVisitorsReturned({ date: today });
    getVisitorsTodays({ date: today });
    getAllAvailableVisitors({ dateNow: today });
  }, [getOffices, getServices, getVisitorsReturned, getVisitorsTodays, getAllAvailableVisitors]);

  // Use focus effect to refresh data when screen comes into focus
  const [isFirstMount, setIsFirstMount] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (isFirstMount) {
        fetchAllData();
        setIsFirstMount(false);
      }
    }, [fetchAllData, isFirstMount])
  );

  // Reset isFirstMount when unmounting
  useEffect(() => {
    return () => {
      setIsFirstMount(true);
    };
  }, []);

  const {
    getPrefixId,
    getSeparatorId,
    getIdLength,
    getIdTotalCount,
    enabledRequiredFace,
    enabledRequiredId,
  } = useConfig();

  const availableVisitors = visitors?.results || [];
  const availableOffices = offices?.results || [];
  const availableServices = [...(services?.results || []), { id: 0, name: 'Other' }];

  const idList: number[] = [];

  const usedIds = new Set([
    ...(visitorsReturned?.results?.map(vr => vr.id) || []),
    ...(visitorsTodays?.results?.filter(vt => !vt.returned?.data?.[0] === true).map(vt => vt.id) ||
      []),
  ]);

  for (let i = 1; i < (getIdTotalCount as any); i++) {
    if (!usedIds.has(i)) {
      idList.push(i);
    }
  }

  const nextAvailableId = idList[0];
  const idCode = String(nextAvailableId).padStart(getIdLength as any, '0');
  const id = getPrefixId! + getSeparatorId! + idCode!;

  const [filteredVisitors, setFilteredVisitors] = useState(availableVisitors);
  const [idSnapshotTaken, setIdSnapshotTaken] = useState(false);
  const [photoSnapshotTaken, setPhotoSnapshotTaken] = useState(false);

  const [visitorModalVisible, setVisitorModalVisible] = useState(false);
  const [officeModalVisible, setOfficeModalVisible] = useState(false);
  const [serviceModalVisible, setServiceModalVisible] = useState(false);

  const handleInputChange = (field: keyof IFormData, value: string) => {
    dispatch(
      setVisitorFormData({
        formData: {
          ...formData,
          [field]: value,
        },
      })
    );

    if (field === 'visitorName') {
      // Allow searching with any input
      const searchTerms = value.split(',').map(term => term.trim());
      const filtered = availableVisitors.filter(visitor => {
        const visitorNameLower = visitor.name.toLowerCase();
        // If there's a comma, search by both terms
        if (searchTerms.length > 1) {
          return searchTerms.every(term => term && visitorNameLower.includes(term.toLowerCase()));
        }
        // If no comma, search by the single term
        return searchTerms[0] && visitorNameLower.includes(searchTerms[0].toLowerCase());
      });
      setFilteredVisitors(filtered);
    }
  };

  const handleSelectVisitor = (visitor: (typeof availableVisitors)[0]) => {
    dispatch(
      setVisitorFormData({
        formData: {
          ...formData,
          visitorName: visitor.name,
          mobileNumber:
            visitor.contactNo1.toString() ??
            visitor.contactNo2.toString() ??
            visitor.contactNo3.toString(),
          visitorId: visitor.id,
        },
      })
    );
  };

  const handleIdSnapshot = () => {
    if (enabledRequiredId) {
      setIdSnapshotTaken(true);
    } else if (faceImageId) {
      setIdSnapshotTaken(false);
    }
    router.push('/(camera)/IDCamera');
  };

  const handlePhotoSnapshot = () => {
    if (enabledRequiredFace) {
      setPhotoSnapshotTaken(true);
    } else if (cardImageId) {
      setPhotoSnapshotTaken(false);
    }
    router.push('/(camera)/FaceCamera');
  };

  const handleBack = () => {
    if (formData) {
      Alert.alert('Are you sure you want to go back?', 'You will lose all unsaved data', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(setFaceImageId({ faceImageId: '' }));
            dispatch(setCardImageId({ cardImageId: '' }));
            dispatch(resetVisitorFormData());
            router.push('/(visitor)/VisitorRegistrationScreen');
          },
        },
      ]);
    } else {
      dispatch(setFaceImageId({ faceImageId: '' }));
      dispatch(setCardImageId({ cardImageId: '' }));
      router.push('/(visitor)/VisitorRegistrationScreen');
    }
  };

  const [signInVisitorLog, { isLoading: isSignInLoading }] = useSignInVisitorLogMutation();
  const [uploadVisitorImages, { isLoading: isUploadingImages }] = useUploadVisitorImagesMutation();

  const handleSignIn = async () => {
    try {
      const timeStamp = new Date();
      const payload: ICreateVisitorLogPayload = {
        log: {
          id: idList[0],
          strId: id,
          logIn: format(timeStamp, 'yyyy-MM-dd HH:mm:ss'),
          logInDate: format(timeStamp, 'yyyy-MM-dd'),
          visitorId: formData.visitorId,
          officeId: formData.officeToVisitId,
          serviceId: formData.serviceId === null ? 0 : formData.serviceId,
          returned: false,
          specService: formData.serviceId === null ? (formData.otherReason ?? '') : '',
        },
      };

      await signInVisitorLog(payload).unwrap();

      const createImageFormData = async (imageId: string, imageType: string) => {
        try {
          const imageUri = `${FileSystem.cacheDirectory}${imageId}`;
          const fileInfo = await FileSystem.getInfoAsync(imageUri);

          if (!fileInfo.exists) {
            console.error(`${imageType} image file not found at path:`, imageUri);
            throw new Error(`${imageType} image file not found`);
          }

          const fileName = `${imageType}_${format(timeStamp, 'yyyy-MM-dd_HH-mm-ss')}.png`;
          console.log('fileName', fileName);
          const formData = new FormData();

          formData.append('photo', {
            uri: Platform.OS === 'android' ? fileInfo.uri : fileInfo.uri.replace('file://', ''),
            type: 'image/png',
            name: fileName,
          } as any);

          return formData;
        } catch (error) {
          console.error(`Error creating FormData for ${imageType} image:`, error);
          throw error;
        }
      };

      const imageUploadPromises: Promise<any>[] = [];

      if (faceImageId) {
        try {
          const faceFormData = await createImageFormData(faceImageId, 'face');
          imageUploadPromises.push(uploadVisitorImages(faceFormData).unwrap());
        } catch (error) {
          console.error('Error preparing face image:', error);
          alert('Error preparing face image for upload');
        }
      }

      if (cardImageId) {
        try {
          const cardFormData = await createImageFormData(cardImageId, 'id');
          imageUploadPromises.push(uploadVisitorImages(cardFormData).unwrap());
        } catch (error) {
          console.error('Error preparing ID image:', error);
          alert('Error preparing ID image for upload');
        }
      }

      if (imageUploadPromises.length > 0) {
        const results = await Promise.allSettled(imageUploadPromises);

        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            console.log(`Image upload ${index + 1} succeeded:`, result.value);
          } else {
            console.error(`Image upload ${index + 1} failed:`, {
              error: result.reason,
              status: result.reason?.status,
              message: result.reason?.message,
              data: result.reason?.data,
              stack: result.reason?.stack,
              response: result.reason?.response,
            });

            // More user-friendly error message
            let errorMessage = 'Unknown error occurred during image upload.';
            if (result.reason?.message?.includes('Network request failed')) {
              errorMessage =
                `Could not connect to the server at ${ipAddress}:${port}. Please check:\n` +
                '1. Server is running\n' +
                '2. IP and port are correct\n' +
                '3. Device and server are on the same network';
            } else if (result.reason?.data?.ghMessage) {
              errorMessage = result.reason.data.ghMessage;
            }

            alert(`Image ${index + 1} upload failed: ${errorMessage}`);
          }
        });

        const successfulUploads = results.filter(result => result.status === 'fulfilled');
        console.log(
          `${successfulUploads.length} out of ${results.length} images uploaded successfully`
        );
      }

      dispatch(setFaceImageId({ faceImageId: '' }));
      dispatch(setCardImageId({ cardImageId: '' }));

      dispatch(resetVisitorFormData());

      router.replace({
        pathname: '/(visitor)/SignInSuccess',
        params: {
          ticketNumber: payload.log.strId,
          visitorName: formData.visitorName,
        },
      });
    } catch (error: any) {
      if (error?.data?.ghMessage) {
        alert(`Error: ${error.data.ghMessage}`);
      } else {
        alert('An error occurred while signing in. Please try again.');
      }
      console.error('Sign-in error:', error);
    }
  };

  // Validate required snapshots based on config
  const isSnapshotValid: boolean =
    (!enabledRequiredFace || Boolean(faceImageId)) && (!enabledRequiredId || Boolean(cardImageId));

  const isValidVisitorName = (name: string): boolean => {
    // Check if name follows the format "LAST, FIRST"
    const nameParts = name.split(',').map(part => part.trim());
    if (nameParts.length !== 2) return false;

    const [lastName, firstName] = nameParts;
    // Check if both parts exist and are at least 2 characters long
    return (
      lastName.length >= 2 &&
      firstName.length >= 2 &&
      // Prevent names that are just repeated characters
      !/^(.)\1+$/.test(lastName) &&
      !/^(.)\1+$/.test(firstName)
    );
  };

  const isFormValid: boolean =
    isValidVisitorName(formData.visitorName) &&
    formData.officeToVisitId !== 0 &&
    formData.reasonForVisit !== '' &&
    (formData.reasonForVisit !== 'Other' ||
      Boolean(formData.otherReason && formData.otherReason.trim() !== '')) &&
    isSnapshotValid;

  return {
    // State
    formData,
    filteredVisitors,
    idSnapshotTaken,
    photoSnapshotTaken,
    visitorModalVisible,
    officeModalVisible,
    serviceModalVisible,
    availableVisitors,
    availableOffices,
    availableServices,
    nextAvailableId,
    id,
    faceImageId,
    cardImageId,
    enabledRequiredFace,
    enabledRequiredId,
    isFormValid,
    isSignInLoading,
    isUploadingImages,

    // Handlers
    handleInputChange,
    handleSelectVisitor,
    handleIdSnapshot,
    handlePhotoSnapshot,
    handleBack,
    handleSignIn,
    setVisitorModalVisible,
    setOfficeModalVisible,
    setServiceModalVisible,
  };
};
