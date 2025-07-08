import { useConfig } from '@/features/config/hooks/useConfig';
import { useGetOfficesQuery } from '@/features/office/api/officeApi';
import { useGetServicesQuery } from '@/features/service/api/serviceApi';
import { ICreateVisitorLogPayload } from '@/features/visitors/api/interface';
import {
  useGetAllAvailableVisitorsQuery,
  useGetVisitorsReturnedQuery,
  useGetVisitorsTodaysQuery,
  useSignInVisitorLogMutation,
  useUploadVisitorImagesMutation
} from '@/features/visitors/api/visitorApi';
import { IFormData } from '@/features/visitors/types/visitorTypes';
import { formattedDate, formattedDateTime, formattedDateTimeWithDashes } from '@/features/visitors/utils/FormattedDate';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { setCardImageId, setFaceImageId } from '@/lib/redux/state/visitorSlice';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: screenHeight } = Dimensions.get('window');

export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { faceImageId, cardImageId } = useAppSelector((state) => state.visitor);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [formData, setFormData] = useState<IFormData>({
    visitorName: '',
    visitorId: 0,
    mobileNumber: '',
    officeToVisitId: 0,
    serviceId: null,
    reasonForVisit: '',
    otherReason: null,
  });

  const { data: visitors } = useGetAllAvailableVisitorsQuery({ dateNow: formattedDate(new Date()) });
  const { data: offices } = useGetOfficesQuery();
  const { data: services } = useGetServicesQuery();
  const { data: visitorsReturned } = useGetVisitorsReturnedQuery({ date: formattedDate(new Date()) });
  const { data: visitorsTodays } = useGetVisitorsTodaysQuery({ date: formattedDate(new Date()) });
  const { getPrefixId, getSeparatorId, getIdLength, getIdTotalCount, enabledRequiredFace, enabledRequiredId } = useConfig();

  const availableVisitors = visitors?.results || [];
  const availableOffices = offices?.results || [];
  const availableServices = [...(services?.results || []), { id: 0, name: 'Other' }];

  const idList: number[] = [];

  const usedIds = new Set([
    ...(visitorsReturned?.results?.map(vr => vr.id) || []),
    ...(visitorsTodays?.results?.filter(vt => !vt.returned?.data?.[0] === true).map(vt => vt.id) || [])
  ]);

  for (let i = 1; i < (getIdTotalCount as any); i++) {
    if (!usedIds.has(i)) {
      idList.push(i);
    }
  }

  const nextAvailableId = idList[0];
  const idCode = String(nextAvailableId).padStart(getIdLength as any, '0');
  const id = getPrefixId! + getSeparatorId! + idCode!;

  const [showDropdown, setShowDropdown] = useState(false);
  const [showOfficeDropdown, setShowOfficeDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [filteredVisitors, setFilteredVisitors] = useState(availableVisitors);
  const [idSnapshotTaken, setIdSnapshotTaken] = useState(false);
  const [photoSnapshotTaken, setPhotoSnapshotTaken] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (enabledRequiredId) {
      setIdSnapshotTaken(true);
    } else if (faceImageId) {
      setIdSnapshotTaken(false);
    }
  }, [enabledRequiredId, faceImageId])

  useEffect(() => {
    if (enabledRequiredFace) {
      setPhotoSnapshotTaken(true);
    } else if (cardImageId) {
      setPhotoSnapshotTaken(false);
    }
  }, [enabledRequiredFace, cardImageId])

  const handleInputChange = (field: keyof IFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'visitorName') {
      const filtered = availableVisitors.filter(visitor =>
        visitor.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredVisitors(filtered);
      setShowDropdown(true);
    }
  };

  const handleSelectVisitor = (visitor: typeof availableVisitors[0]) => {
    setFormData(prev => ({
      ...prev,
      visitorName: visitor.name,
      mobileNumber: visitor.contactNo1.toString() ?? visitor.contactNo2.toString() ?? visitor.contactNo3.toString(),
      visitorId: visitor.id
    }));
    setShowDropdown(false);
  };

  const handleIdSnapshot = () => {
    router.push('/(camera)/IDCamera');
  };

  const handlePhotoSnapshot = () => {
    router.push('/(camera)/FaceCamera');
  };

  const handleBack = () => {
    router.push('/(visitor)/VisitorRegistrationScreen')
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setShowDropdown(false);
    setShowOfficeDropdown(false);
    setShowServiceDropdown(false);
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
          specService: formData.serviceId === null ? formData.otherReason ?? '' : '',
        }
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
        console.log(`${successfulUploads.length} out of ${results.length} images uploaded successfully`);
      }

      dispatch(setFaceImageId({ faceImageId: '' }));
      dispatch(setCardImageId({ cardImageId: '' }));

      router.replace({
        pathname: '/(visitor)/SignInSuccess',
        params: {
          ticketNumber: payload.log.strId,
          visitorName: formData.visitorName
        }
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

  // Render dropdown items without FlatList
  const renderDropdownItems = (items: any[], onSelect: (item: any) => void, keyExtractor: (item: any) => string) => {
    return items.slice(0, 5).map((item) => (
      <TouchableOpacity
        key={keyExtractor(item)}
        className="px-4 py-3 border-b border-gray-100"
        onPress={() => onSelect(item)}
      >
        <Text className="text-gray-800 text-base">{item.name}</Text>
        {item.contactNo1 && (
          <Text className="text-gray-500 text-sm">
            {item.contactNo1.toString() ?? item.contactNo2.toString() ?? item.contactNo3.toString()}
          </Text>
        )}
      </TouchableOpacity>
    ));
  };

  // Validate required snapshots based on config
  const isSnapshotValid =
    (!enabledRequiredFace || faceImageId) &&
    (!enabledRequiredId || cardImageId);

  const isFormValid = formData.visitorName.trim() !== '' &&
    formData.officeToVisitId !== 0 &&
    formData.reasonForVisit !== '' &&
    (formData.reasonForVisit !== 'Other' || (formData.otherReason && formData.otherReason.trim() !== '')) &&
    isSnapshotValid;

  // Calculate available height for content
  const availableHeight = screenHeight - insets.top - insets.bottom - keyboardHeight;
  const shouldShowSidebar = availableHeight > 600 && keyboardHeight === 0;

  return (
    <View
      className="flex-1 bg-white"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View className="flex-1">
          <View className="flex-row flex-1">
            <View className="flex-1">
              <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              >
                <ScrollView
                  className="flex-1"
                  contentContainerStyle={{ flexGrow: 1 }}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                >
                  <View className="flex-1 px-8 py-6">
                    <Text className="text-3xl font-bold text-gray-800 mb-8">
                      Sign In
                    </Text>

                    {/* Camera Buttons */}
                    <View className="flex-row gap-4 mb-8">
                      <TouchableOpacity
                        onPress={handleIdSnapshot}
                        className={`flex-1 border-2 rounded-lg p-6 items-center justify-center h-32 ${!idSnapshotTaken ? 'border-green-400 bg-green-50' : 'border-red-300 bg-red-50'
                          }`}
                      >
                        <View className="items-center">
                          <View className="w-12 h-8 border-2 border-gray-400 rounded mb-2 items-center justify-center">
                            <View className="w-4 h-4 bg-gray-600 rounded-full" />
                          </View>
                          <Text className="text-base font-medium text-gray-700 text-center">
                            ID Snapshot
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={handlePhotoSnapshot}
                        className={`flex-1 border-2 rounded-lg p-6 items-center justify-center h-32 ${!photoSnapshotTaken ? 'border-green-400 bg-green-50' : 'border-red-300 bg-yellow-50'
                          }`}
                      >
                        <View className="items-center">
                          <View className="w-10 h-10 border-2 border-gray-400 rounded-full mb-2 items-center justify-center">
                            <View className="w-6 h-6 bg-gray-300 rounded-full" />
                          </View>
                          <Text className="text-base font-medium text-gray-700 text-center">
                            Photo Snapshot
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    {/* Form Fields */}
                    <View className="gap-6">
                      {/* Visitor Name with Dropdown */}
                      <View className="relative z-40">
                        <Text className="text-base font-semibold text-gray-700 mb-2">
                          Visitor&apos;s Name <Text className="text-red-500">*</Text>
                        </Text>
                        <TextInput
                          className="bg-white border border-blue-300 rounded-lg px-4 py-4 text-lg"
                          placeholder="Search visitor"
                          placeholderTextColor="gray"
                          value={formData.visitorName}
                          onChangeText={(value) => handleInputChange('visitorName', value)}
                          onFocus={() => setShowDropdown(true)}
                          returnKeyType="next"
                        />
                        {showDropdown && filteredVisitors.length > 0 && (
                          <View className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-50">
                            <ScrollView
                              style={{ maxHeight: 200 }}
                              nestedScrollEnabled={true}
                              showsVerticalScrollIndicator={false}
                            >
                              {renderDropdownItems(
                                filteredVisitors,
                                handleSelectVisitor,
                                (item) => item.id.toString()
                              )}
                            </ScrollView>
                          </View>
                        )}
                      </View>

                      {/* Mobile Number */}
                      <View>
                        <Text className="text-base font-semibold text-gray-700 mb-2">
                          Mobile Number
                        </Text>
                        <TextInput
                          className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-4 text-lg"
                          placeholder="Mobile Number"
                          placeholderTextColor="gray"
                          value={formData.mobileNumber}
                          onChangeText={(value) => handleInputChange('mobileNumber', value)}
                          keyboardType="phone-pad"
                          returnKeyType="next"
                        />
                      </View>

                      {/* Office to Visit */}
                      <View className="relative z-30">
                        <Text className="text-base font-semibold text-gray-700 mb-2">
                          Office to visit <Text className="text-red-500">*</Text>
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setShowOfficeDropdown(!showOfficeDropdown);
                            setShowServiceDropdown(false);
                            setShowDropdown(false);
                          }}
                          className="bg-white border border-gray-200 rounded-lg px-4 py-4 flex-row justify-between items-center"
                        >
                          <Text className={`text-lg ${formData.officeToVisitId ? 'text-gray-900' : 'text-gray-400'}`}>
                            {formData.officeToVisitId ?
                              availableOffices.find((office) => office.id as number === formData.officeToVisitId as number)?.name :
                              'Select office'
                            }
                          </Text>
                          <View className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-500" />
                        </TouchableOpacity>
                        {showOfficeDropdown && availableOffices.length > 0 && (
                          <View className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-50">
                            <ScrollView
                              style={{ maxHeight: 200 }}
                              nestedScrollEnabled={true}
                              showsVerticalScrollIndicator={false}
                            >
                              {renderDropdownItems(
                                availableOffices,
                                (item) => {
                                  setFormData(prev => ({ ...prev, officeToVisitId: item.id as number }));
                                  setShowOfficeDropdown(false);
                                },
                                (item) => item.id.toString()
                              )}
                            </ScrollView>
                          </View>
                        )}
                      </View>

                      {/* Reason for Visit */}
                      <View className="relative z-20">
                        <Text className="text-base font-semibold text-gray-700 mb-2">
                          Reason for visit <Text className="text-red-500">*</Text>
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setShowServiceDropdown(!showServiceDropdown);
                            setShowOfficeDropdown(false);
                            setShowDropdown(false);
                          }}
                          className="bg-white border border-gray-200 rounded-lg px-4 py-4 flex-row justify-between items-center"
                        >
                          <Text className={`text-lg ${formData.reasonForVisit ? 'text-gray-900' : 'text-gray-400'}`}>
                            {formData.reasonForVisit || 'Select reason'}
                          </Text>
                          <View className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-500" />
                        </TouchableOpacity>
                        {showServiceDropdown && availableServices.length > 0 && (
                          <View className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-50">
                            <ScrollView
                              style={{ maxHeight: 200 }}
                              nestedScrollEnabled={true}
                              showsVerticalScrollIndicator={false}
                            >
                              {renderDropdownItems(
                                availableServices,
                                (item) => {
                                  setFormData(prev => ({
                                    ...prev,
                                    reasonForVisit: item.name,
                                    serviceId: item.id === 0 ? null : item.id,
                                    otherReason: item.id === 0 ? prev.otherReason : null
                                  }));
                                  setShowServiceDropdown(false);
                                },
                                (item) => item.id.toString()
                              )}
                            </ScrollView>
                          </View>
                        )}
                        {formData.reasonForVisit === 'Other' && (
                          <View className="mt-4">
                            <Text className="text-base font-semibold text-gray-700 mb-2">
                              Please specify <Text className="text-red-500">*</Text>
                            </Text>
                            <TextInput
                              className="bg-white border border-gray-200 rounded-lg px-4 py-4 text-lg"
                              placeholder="Please specify your reason"
                              value={formData.otherReason ?? ''}
                              multiline={true}
                              numberOfLines={4}
                              textAlignVertical="top"
                              onChangeText={(value) => setFormData(prev => ({ ...prev, otherReason: value ?? null }))}
                            />
                          </View>
                        )}
                      </View>

                      {/* Mobile Action Buttons - Show when sidebar is hidden */}
                      {!shouldShowSidebar && (
                        <View className="mt-8 gap-4 pb-6">
                          {/* Status indicators */}
                          <View className="p-4 bg-gray-50 rounded-lg">
                            <Text className="text-sm font-medium text-gray-600 mb-3">Status</Text>
                            <View className="gap-2">
                              <View className="flex-row items-center gap-2">
                                <View className={`w-3 h-3 rounded-full ${enabledRequiredId ? (cardImageId ? 'bg-green-500' : 'bg-red-400') : 'bg-gray-400'}`} />
                                <Text className="text-sm text-gray-700">
                                  ID Snapshot {enabledRequiredId && <Text className="text-red-500">*</Text>}
                                </Text>
                              </View>
                              <View className="flex-row items-center gap-2">
                                <View className={`w-3 h-3 rounded-full ${enabledRequiredFace ? (faceImageId ? 'bg-green-500' : 'bg-red-400') : 'bg-gray-400'}`} />
                                <Text className="text-sm text-gray-700">
                                  Photo Snapshot {enabledRequiredFace && <Text className="text-red-500">*</Text>}
                                </Text>
                              </View>
                              <View className="flex-row items-center gap-2">
                                <View className={`w-3 h-3 rounded-full ${isFormValid ? 'bg-green-500' : 'bg-gray-400'}`} />
                                <Text className="text-sm text-gray-700">Form Complete</Text>
                              </View>
                            </View>
                          </View>

                          {/* Generated ID */}
                          {nextAvailableId && (
                            <View className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                              <Text className="text-sm font-medium text-blue-800 mb-1">
                                Generated ID
                              </Text>
                              <Text className="text-lg font-bold text-blue-900">
                                {id}
                              </Text>
                            </View>
                          )}

                          {/* Action Buttons */}
                          <View className="gap-3">
                            <TouchableOpacity
                              onPress={handleBack}
                              className="bg-gray-100 rounded-lg py-4 border border-gray-200"
                            >
                              <Text className="text-gray-700 text-lg font-medium text-center">
                                Back
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={handleSignIn}
                              disabled={!isFormValid || isSignInLoading || isUploadingImages}
                              className={`rounded-lg py-4 ${isFormValid && !isSignInLoading && !isUploadingImages
                                ? 'bg-blue-500'
                                : 'bg-blue-300'
                                }`}
                            >
                              <Text className="text-white text-lg font-semibold text-center">
                                {isSignInLoading || isUploadingImages ? 'Signing In...' : 'Sign In'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </View>

            {/* Sidebar - Show only when there's enough space */}
            {shouldShowSidebar && (
              <View className="w-80 px-6 py-6 bg-gray-50 border-l border-gray-200">
                <View className="flex-1 justify-between">
                  <View>
                    <View className="mb-6">
                      <Text className="text-sm font-medium text-gray-600 mb-3">Status</Text>
                      <View className="gap-2">
                        <View className="flex-row items-center gap-2">
                          <View className={`w-3 h-3 rounded-full ${enabledRequiredId ? (cardImageId ? 'bg-green-500' : 'bg-red-400') : 'bg-gray-400'}`} />
                          <Text className="text-sm text-gray-700">
                            ID Snapshot {enabledRequiredId && <Text className="text-red-500">*</Text>}
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                          <View className={`w-3 h-3 rounded-full ${enabledRequiredFace ? (faceImageId ? 'bg-green-500' : 'bg-red-400') : 'bg-gray-400'}`} />
                          <Text className="text-sm text-gray-700">
                            Photo Snapshot {enabledRequiredFace && <Text className="text-red-500">*</Text>}
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                          <View className={`w-3 h-3 rounded-full ${isFormValid ? 'bg-green-500' : 'bg-gray-400'}`} />
                          <Text className="text-sm text-gray-700">Form Complete</Text>
                        </View>
                      </View>
                    </View>

                    {nextAvailableId && (
                      <View className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <Text className="text-sm font-medium text-blue-800 mb-1">
                          Generated ID
                        </Text>
                        <Text className="text-lg font-bold text-blue-900">
                          {id}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Action Buttons */}
                  <View className="gap-4">
                    <TouchableOpacity
                      onPress={handleBack}
                      className="bg-gray-100 rounded-lg py-4 border border-gray-200"
                    >
                      <Text className="text-gray-700 text-lg font-medium text-center">
                        Back
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleSignIn}
                      disabled={!isFormValid || isSignInLoading || isUploadingImages}
                      className={`rounded-lg py-4 ${isFormValid && !isSignInLoading && !isUploadingImages
                        ? 'bg-blue-500'
                        : 'bg-blue-300'
                        }`}
                    >
                      <Text className="text-white text-lg font-semibold text-center">
                        {isSignInLoading || isUploadingImages ? 'Signing In...' : 'Sign In'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}