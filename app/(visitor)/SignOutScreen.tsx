import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignOutScreen() {
  const [ticketNumber, setTicketNumber] = useState('');
  const [cameraActive, setCameraActive] = useState(false);

  const handleSignOut = () => {
    console.log('Sign Out with ticket:', ticketNumber);
  };

  const handleBack = () => {
    router.push('/(main)')
  };

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
    console.log('Camera toggled:', !cameraActive);
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br bg-white from-blue-400 to-blue-600">
      <View className="flex-1 px-6 pt-8 pb-4">
        <Text className="text-2xl font-bold text-gray-800 mb-8">
          Sign Out
        </Text>

        <TouchableOpacity
          onPress={toggleCamera}
          className="bg-gray-900 rounded-lg mb-8 h-64 items-center justify-center"
        >
          {cameraActive ? (
            <View className="items-center">
              <View className="w-16 h-16 border-4 border-white rounded-full mb-4 items-center justify-center">
                <View className="w-8 h-8 bg-white rounded-full" />
              </View>
              <Text className="text-white text-sm">Camera Active</Text>
              <Text className="text-gray-300 text-xs mt-1">Tap to capture</Text>
            </View>
          ) : (
            <View className="items-center">
              <View className="w-16 h-16 border-2 border-gray-500 rounded-full mb-4 items-center justify-center">
                <View className="w-8 h-8 bg-gray-500 rounded-full" />
              </View>
              <Text className="text-gray-400 text-sm">Camera Preview</Text>
              <Text className="text-gray-500 text-xs mt-1">Tap to activate</Text>
            </View>
          )}
        </TouchableOpacity>

        <View className="mb-8">
          <TextInput
            className="bg-white border border-gray-200 rounded-lg px-4 py-4 text-base text-center"
            placeholder="Ticket Number"
            value={ticketNumber}
            onChangeText={setTicketNumber}
            keyboardType="numeric"
          />
        </View>

        <View className="items-center mb-8">
          <TouchableOpacity
            onPress={handleSignOut}
            className="bg-blue-400 rounded-full py-4 px-12 shadow-sm"
          >
            <Text className="text-white text-base font-semibold">
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-6 py-4 bg-white border-t border-gray-100">
        <TouchableOpacity
          onPress={handleBack}
          className="bg-gray-100 rounded-full py-3 px-6 self-start"
        >
          <Text className="text-gray-700 text-base font-medium">
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}