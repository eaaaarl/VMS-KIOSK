import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Mock visitor data
const mockVisitors = [
  { id: '1', name: 'John Smith', mobile: '+1234567890' },
  { id: '2', name: 'Sarah Johnson', mobile: '+1234567891' },
  { id: '3', name: 'Michael Brown', mobile: '+1234567892' },
  { id: '4', name: 'Emily Davis', mobile: '+1234567893' },
  { id: '5', name: 'David Wilson', mobile: '+1234567894' },
];

export default function SignInScreen() {
  const [formData, setFormData] = useState({
    visitorName: '',
    mobileNumber: '',
    officeToVisit: '',
    reasonForVisit: ''
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredVisitors, setFilteredVisitors] = useState(mockVisitors);
  const [idSnapshotTaken, setIdSnapshotTaken] = useState(false);
  const [photoSnapshotTaken, setPhotoSnapshotTaken] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'visitorName') {
      const filtered = mockVisitors.filter(visitor =>
        visitor.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredVisitors(filtered);
      setShowDropdown(true);
    }
  };

  const handleSelectVisitor = (visitor: typeof mockVisitors[0]) => {
    setFormData(prev => ({
      ...prev,
      visitorName: visitor.name,
      mobileNumber: visitor.mobile
    }));
    setShowDropdown(false);
  };

  const handleIdSnapshot = () => {
    setIdSnapshotTaken(true);
    console.log('ID Snapshot taken');
  };

  const handlePhotoSnapshot = () => {
    setPhotoSnapshotTaken(true);
    console.log('Photo Snapshot taken');
  };

  const handleSignIn = () => {
    console.log('Sign In data:', formData);
  };

  const handleBack = () => {
    console.log('Back pressed');
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br bg-white from-blue-400 to-blue-600">
      <View className="flex-1 px-6 pt-8 pb-4">
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
          <View className="relative">
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
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="px-4 py-3 border-b border-gray-100"
                      onPress={() => handleSelectVisitor(item)}
                    >
                      <Text className="text-gray-800">{item.name}</Text>
                      <Text className="text-gray-500 text-sm">{item.mobile}</Text>
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
          <View>
            <Text className="text-base font-semibold text-gray-700 mb-2">
              Office to visit <Text className="text-red-500">*</Text>
            </Text>
            <TouchableOpacity className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center">
              <Text className={`text-base ${formData.officeToVisit ? 'text-gray-900' : 'text-gray-400'}`}>
                {formData.officeToVisit || 'Select office'}
              </Text>
              <View className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-500" />
            </TouchableOpacity>
          </View>

          {/* Reason for Visit */}
          <View>
            <Text className="text-base font-semibold text-gray-700 mb-2">
              Reason for visit <Text className="text-red-500">*</Text>
            </Text>
            <TouchableOpacity className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center">
              <Text className={`text-base ${formData.reasonForVisit ? 'text-gray-900' : 'text-gray-400'}`}>
                {formData.reasonForVisit || 'Select reason'}
              </Text>
              <View className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-500" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bottom Action Buttons */}
      <View className="px-6 py-4 bg-white border-t border-gray-100 flex-row justify-between items-center">
        {/* Back Button */}
        <TouchableOpacity
          onPress={handleBack}
          className="bg-gray-100 rounded-full py-3 px-6"
        >
          <Text className="text-gray-700 text-base font-medium">
            Back
          </Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity
          onPress={handleSignIn}
          className="bg-blue-400 rounded-full py-3 px-8 shadow-sm"
        >
          <Text className="text-white text-base font-semibold">
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
}