import { useConfig } from '@/features/config/hooks/useConfig';
import { useGetOfficesQuery } from '@/features/office/api/officeApi';
import { useGetServicesQuery } from '@/features/service/api/serviceApi';
import { ICreateVisitorLogPayload } from '@/features/visitors/api/interface';
import {
  useGetAllAvailableVisitorsQuery,
  useGetVisitorsReturnedQuery,
  useGetVisitorsTodaysQuery,
  useSignInVisitorLogMutation,
  useUploadVisitorImagesMutation,
} from '@/features/visitors/api/visitorApi';
import { IFormData } from '@/features/visitors/types/visitorTypes';
import {
  formattedDate,
  formattedDateTime,
  formattedDateTimeWithDashes,
} from '@/features/visitors/utils/FormattedDate';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { setCardImageId, setFaceImageId } from '@/lib/redux/state/visitorSlice';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import { useState } from 'react';

export const useSignInScreen = () => {
  const dispatch = useAppDispatch();
  const { faceImageId, cardImageId } = useAppSelector(state => state.visitor);
  const [formData, setFormData] = useState<IFormData>({
    visitorName: '',
    visitorId: 0,
    mobileNumber: '',
    officeToVisitId: 0,
    serviceId: null,
    reasonForVisit: '',
    otherReason: null,
  });

  const { data: visitors } = useGetAllAvailableVisitorsQuery({
    dateNow: formattedDate(new Date()),
  });
  const { data: offices } = useGetOfficesQuery();
  const { data: services } = useGetServicesQuery();
  const { data: visitorsReturned } = useGetVisitorsReturnedQuery({
    date: formattedDate(new Date()),
  });
  const { data: visitorsTodays } = useGetVisitorsTodaysQuery({ date: formattedDate(new Date()) });
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
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    if (field === 'visitorName') {
      const filtered = availableVisitors.filter(visitor =>
        visitor.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredVisitors(filtered);
    }
  };

  const handleSelectVisitor = (visitor: (typeof availableVisitors)[0]) => {
    setFormData(prev => ({
      ...prev,
      visitorName: visitor.name,
      mobileNumber:
        visitor.contactNo1.toString() ??
        visitor.contactNo2.toString() ??
        visitor.contactNo3.toString(),
      visitorId: visitor.id,
    }));
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
    router.push('/(visitor)/VisitorRegistrationScreen');
  };

  const [signInVisitorLog, { isLoading: isSignInLoading }] = useSignInVisitorLogMutation();
  const [uploadVisitorImages, { isLoading: isUploadingImages }] = useUploadVisitorImagesMutation();

  const handleSignIn = async () => {
    try {
      const payload: ICreateVisitorLogPayload = {
        log: {
          id: idList[0],
          strId: id,
          logIn: formattedDateTime(new Date()),
          logInDate: formattedDate(new Date()),
          visitorId: formData.visitorId,
          officeId: formData.officeToVisitId,
          serviceId: formData.serviceId === null ? 0 : formData.serviceId,
          returned: false,
          specService: formData.serviceId === null ? (formData.otherReason ?? '') : '',
        },
      };

      await signInVisitorLog(payload).unwrap();

      const createImageFormData = async (imageId: string, imageType: string) => {
        const imageUri = `${FileSystem.cacheDirectory}${imageId}`;
        const fileInfo = await FileSystem.getInfoAsync(imageUri);

        if (!fileInfo.exists) {
          throw new Error(`${imageType} image file not found`);
        }

        const fileName = `${imageType}_${formattedDateTimeWithDashes(new Date())}.png`;
        const formData = new FormData();
        formData.append('photo', {
          uri: fileInfo.uri,
          type: 'image/png',
          name: fileName,
        } as any);

        return formData;
      };

      const imageUploadPromises: Promise<any>[] = [];

      if (faceImageId) {
        const faceFormData = await createImageFormData(faceImageId, 'face');
        imageUploadPromises.push(uploadVisitorImages(faceFormData).unwrap());
      }

      if (cardImageId) {
        const cardFormData = await createImageFormData(cardImageId, 'id');
        imageUploadPromises.push(uploadVisitorImages(cardFormData).unwrap());
      }

      if (imageUploadPromises.length > 0) {
        const results = await Promise.allSettled(imageUploadPromises);

        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            console.log(`Image upload ${index + 1} succeeded:`, result.value);
          } else {
            console.error(`Image upload ${index + 1} failed:`, result.reason);
            alert(`Image ${index + 1} could not be processed. Continuing without this image.`);
          }
        });

        const successfulUploads = results.filter(result => result.status === 'fulfilled');
        console.log(
          `${successfulUploads.length} out of ${results.length} images uploaded successfully`
        );
      }

      dispatch(setFaceImageId({ faceImageId: '' }));
      dispatch(setCardImageId({ cardImageId: '' }));

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

  const isFormValid: boolean =
    formData.visitorName.trim() !== '' &&
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
    setFormData,
  };
};
