import { useGetOfficesQuery } from '@/features/office/api/officeApi';
import { useGetServicesQuery } from '@/features/service/api/serviceApi';
import { useGetAllAvailableVisitorsQuery } from '@/features/visitors/api/visitorApi';
import { formattedDate } from '@/features/visitors/utils/FormattedDate';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';


export default function SignInScreen() {
  const [formData, setFormData] = useState({
    visitorName: '',
    mobileNumber: '',
    officeToVisit: '',
    reasonForVisit: '',
    otherReason: ''
  });

  const { data: visitors } = useGetAllAvailableVisitorsQuery({ dateNow: formattedDate(new Date()) });
  const { data: offices } = useGetOfficesQuery();
  const { data: services } = useGetServicesQuery();

  const availableVisitors = visitors?.results || [];
  const availableOffices = offices?.results || [];
  const availableServices = [...(services?.results || []), { id: 'other', name: 'Other' }];

  const [showDropdown, setShowDropdown] = useState(false);
  const [showOfficeDropdown, setShowOfficeDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [filteredVisitors, setFilteredVisitors] = useState(availableVisitors);
  const [idSnapshotTaken, setIdSnapshotTaken] = useState(false);
  const [photoSnapshotTaken, setPhotoSnapshotTaken] = useState(false);

  const handleInputChange = (field: string, value: string) => {
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
      mobileNumber: visitor.contactNo1.toString() ?? visitor.contactNo2.toString() ?? visitor.contactNo3.toString()
    }));
    setShowDropdown(false);
  };

  const handleIdSnapshot = () => {
    setIdSnapshotTaken(true);
  };

  const handlePhotoSnapshot = () => {
    setPhotoSnapshotTaken(true);
    router.push('/(camera)/FaceCamera');
  };

  const handleSignIn = () => {
    console.log('Sign In data:', formData);
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

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br bg-white from-blue-400 to-blue-600">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1">
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View className="flex-1">
              <View className="px-6 pt-8 pb-4">
                <Text className="text-2xl font-bold text-gray-800 mb-8">
                  Sign In
                </Text>

                <View className="flex-row gap-4 mb-8">
                  <TouchableOpacity
                    onPress={handleIdSnapshot}
                    className={`flex-1 border-2 rounded-lg p-6 items-center justify-center h-32 ${idSnapshotTaken ? 'border-green-400 bg-green-50' : 'border-red-300 bg-red-50'
                      }`}
                  >
                    <View className="items-center">
                      <View className="w-12 h-8 border-2 border-gray-400 rounded mb-2 items-center justify-center">
                        <View className="w-4 h-4 bg-gray-600 rounded-full" />
                      </View>
                      <Text className="text-sm font-medium text-gray-700 text-center">
                        ID Snapshot
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* Photo Snapshot */}
                  <TouchableOpacity
                    onPress={handlePhotoSnapshot}
                    className={`flex-1 border-2 rounded-lg p-6 items-center justify-center h-32 ${photoSnapshotTaken ? 'border-green-400 bg-green-50' : 'border-yellow-300 bg-yellow-50'
                      }`}
                  >
                    <View className="items-center">
                      <View className="w-10 h-10 border-2 border-gray-400 rounded-full mb-2 items-center justify-center">
                        <View className="w-6 h-6 bg-gray-300 rounded-full" />
                      </View>
                      <Text className="text-sm font-medium text-gray-700 text-center">
                        Photo Snapshot
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View className="gap-4">
                  <View className="relative z-40">
                    <Text className="text-base font-semibold text-gray-700 mb-2">
                      Visitors Name <Text className="text-red-500">*</Text>
                    </Text>
                    <TextInput
                      className="bg-white border border-blue-300 rounded-lg px-4 py-3 text-base"
                      placeholder="Search visitor"
                      value={formData.visitorName}
                      onChangeText={(value) => handleInputChange('visitorName', value)}
                      onFocus={() => setShowDropdown(true)}
                    />
                    {showDropdown && filteredVisitors.length > 0 && (
                      <View className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 z-10 max-h-40">
                        <FlatList
                          data={filteredVisitors}
                          keyExtractor={(item) => item.id.toString()}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              className="px-4 py-3 border-b border-gray-100"
                              onPress={() => handleSelectVisitor(item)}
                            >
                              <Text className="text-gray-800">{item.name}</Text>
                              <Text className="text-gray-500 text-sm">{item.contactNo1.toString() ?? item.contactNo2.toString() ?? item.contactNo3.toString()}</Text>
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                    )}
                  </View>

                  {/* Mobile Number */}
                  <View>
                    <Text className="text-base font-semibold text-gray-700 mb-2">
                      Mobile Number
                    </Text>
                    <TextInput
                      className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-base"
                      placeholder="Mobile Number"
                      value={formData.mobileNumber}
                      onChangeText={(value) => handleInputChange('mobileNumber', value)}
                      keyboardType="phone-pad"
                    />
                  </View>

                  {/* Office to Visit */}
                  <View className="relative z-30">
                    <Text className="text-base font-semibold text-gray-700 mb-2">
                      Office to visit <Text className="text-red-500">*</Text>
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        Keyboard.dismiss();
                        setShowOfficeDropdown(!showOfficeDropdown);
                        setShowServiceDropdown(false);
                        setShowDropdown(false);
                      }}
                      className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center"
                    >
                      <Text className={`text-base ${formData.officeToVisit ? 'text-gray-900' : 'text-gray-400'}`}>
                        {formData.officeToVisit || 'Select office'}
                      </Text>
                      <View className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-500" />
                    </TouchableOpacity>
                    {showOfficeDropdown && availableOffices.length > 0 && (
                      <View className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 z-10 max-h-40">
                        <FlatList
                          data={availableOffices}
                          keyExtractor={(item) => item.id.toString()}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              className="px-4 py-3 border-b border-gray-100"
                              onPress={() => {
                                setFormData(prev => ({ ...prev, officeToVisit: item.name }));
                                setShowOfficeDropdown(false);
                              }}
                            >
                              <Text className="text-gray-800">{item.name}</Text>
                            </TouchableOpacity>
                          )}
                        />
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
                        Keyboard.dismiss();
                        setShowServiceDropdown(!showServiceDropdown);
                        setShowOfficeDropdown(false);
                        setShowDropdown(false);
                      }}
                      className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center"
                    >
                      <Text className={`text-base ${formData.reasonForVisit ? 'text-gray-900' : 'text-gray-400'}`}>
                        {formData.reasonForVisit || 'Select reason'}
                      </Text>
                      <View className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-500" />
                    </TouchableOpacity>
                    {showServiceDropdown && availableServices.length > 0 && (
                      <View className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 z-10 max-h-40">
                        <FlatList
                          data={availableServices}
                          keyExtractor={(item) => item.id.toString()}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              className="px-4 py-3 border-b border-gray-100"
                              onPress={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  reasonForVisit: item.name,
                                  otherReason: item.id === 'other' ? '' : prev.otherReason
                                }));
                                setShowServiceDropdown(false);
                              }}
                            >
                              <Text className="text-gray-800">{item.name}</Text>
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                    )}
                    {formData.reasonForVisit === 'Other' && (
                      <View className="mt-2">
                        <Text className="text-base font-semibold text-gray-700 mb-2">
                          (Please specify) <Text className="text-red-500">*</Text>
                        </Text>
                        <TextInput
                          className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-base"
                          placeholder="Please specify your reason"
                          value={formData.otherReason}
                          multiline={true}
                          numberOfLines={4}
                          textAlignVertical="top"
                          onChangeText={(value) => setFormData(prev => ({ ...prev, otherReason: value }))}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>

              <View className="px-6 py-4 bg-white border-t border-gray-100 flex-row justify-between items-center">
                <TouchableOpacity
                  onPress={handleBack}
                  className="bg-gray-100 rounded-full py-3 px-6"
                >
                  <Text className="text-gray-700 text-base font-medium">
                    Back
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSignIn}
                  className="bg-blue-400 rounded-full py-3 px-8 shadow-sm"
                >
                  <Text className="text-white text-base font-semibold">
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}