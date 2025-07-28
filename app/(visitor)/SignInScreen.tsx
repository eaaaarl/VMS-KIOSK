import {
  SignInCameraButtons,
  SignInFormFields,
  SignInOfficeModal,
  SignInServiceModal,
  SignInStatusSidebar,
  SignInVisitorModal,
  useSignInScreen,
} from '@/features/visitors';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SignInScreen() {
  const insets = useSafeAreaInsets();

  const {
    // State
    formData,
    filteredVisitors,
    idSnapshotTaken,
    photoSnapshotTaken,
    visitorModalVisible,
    officeModalVisible,
    serviceModalVisible,
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
  } = useSignInScreen();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleServiceSelect = (serviceId: number, serviceName: string) => {
    setFormData(prev => ({
      ...prev,
      reasonForVisit: serviceName,
      serviceId: serviceId === 0 ? null : serviceId,
      otherReason: serviceId === 0 ? prev.otherReason : null,
    }));
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View className="flex-1">
          <View className="flex-1 flex-row">
            <View className="flex-1 px-8 py-6">
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
              >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  className="flex-1"
                  contentContainerStyle={{ flexGrow: 1 }}
                >
                  <View className="flex-1 px-8 py-6">
                    <View className="mb-8 flex-row items-center justify-between">
                      <Text className="text-3xl font-bold text-gray-800">Sign In</Text>
                    </View>

                    {/* Camera Buttons */}
                    <SignInCameraButtons
                      idSnapshotTaken={idSnapshotTaken}
                      photoSnapshotTaken={photoSnapshotTaken}
                      onIdSnapshot={handleIdSnapshot}
                      onPhotoSnapshot={handlePhotoSnapshot}
                      faceImageId={faceImageId}
                      cardImageId={cardImageId}
                    />

                    {/* Form Fields */}
                    <SignInFormFields
                      formData={formData}
                      availableOffices={availableOffices}
                      onVisitorNamePress={() => setVisitorModalVisible(true)}
                      onMobileNumberChange={value => handleInputChange('mobileNumber', value)}
                      onOfficePress={() => setOfficeModalVisible(true)}
                      onServicePress={() => setServiceModalVisible(true)}
                      onOtherReasonChange={value =>
                        setFormData(prev => ({ ...prev, otherReason: value }))
                      }
                    />
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </View>

            {/* Status Sidebar */}
            <SignInStatusSidebar
              enabledRequiredId={enabledRequiredId}
              enabledRequiredFace={enabledRequiredFace}
              cardImageId={cardImageId}
              faceImageId={faceImageId}
              isFormValid={isFormValid}
              nextAvailableId={nextAvailableId}
              id={id}
              isSignInLoading={isSignInLoading}
              isUploadingImages={isUploadingImages}
              onBack={handleBack}
              onSignIn={handleSignIn}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Modals */}
      <SignInVisitorModal
        visible={visitorModalVisible}
        visitorName={formData.visitorName}
        filteredVisitors={filteredVisitors}
        onVisitorNameChange={value => handleInputChange('visitorName', value)}
        onSelectVisitor={handleSelectVisitor}
        onClose={() => setVisitorModalVisible(false)}
      />

      <SignInOfficeModal
        visible={officeModalVisible}
        availableOffices={availableOffices}
        onSelectOffice={officeId => setFormData(prev => ({ ...prev, officeToVisitId: officeId }))}
        onClose={() => setOfficeModalVisible(false)}
      />

      <SignInServiceModal
        visible={serviceModalVisible}
        availableServices={availableServices}
        onSelectService={handleServiceSelect}
        onClose={() => setServiceModalVisible(false)}
      />
    </View>
  );
}
