import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ApiConfigFormProps {
  ipAddress: string;
  port: string;
  isLoading: boolean;
  onIpAddressChange: (value: string) => void;
  onPortChange: (value: string) => void;
  onSave: () => void;
  isTablet?: boolean;
}

const ApiConfigForm: React.FC<ApiConfigFormProps> = ({
  ipAddress,
  port,
  isLoading,
  onIpAddressChange,
  onPortChange,
  onSave,
  isTablet = false,
}) => (
  <View className={`rounded-xl border mb-4 border-gray-200 bg-white shadow-sm ${isTablet ? 'p-8' : 'p-6'}`}>
    <View className="mb-4">
      <Text className={`mb-1 font-semibold text-gray-900 ${isTablet ? 'text-xl' : 'text-lg'}`}>API Configuration</Text>
      <Text className={`text-gray-600 ${isTablet ? 'text-base' : 'text-sm'}`}>
        Enter your server details to establish connection
      </Text>
    </View>
    <View className="gap-4">
      <View>
        <Text className={`mb-2 font-medium text-gray-700 ${isTablet ? 'text-base' : 'text-sm'}`}>IP Address</Text>
        <TextInput
          value={ipAddress}
          onChangeText={onIpAddressChange}
          placeholder="e.g., 192.168.1.100"
          className={`rounded-lg border border-gray-300 bg-gray-50 px-4 text-black ${isTablet ? 'py-4 text-lg' : 'py-3 text-base'}`}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#9CA3AF"
        />
        <Text className={`mt-1 text-gray-500 ${isTablet ? 'text-sm' : 'text-xs'}`}>
          Enter the IP address of your development server
        </Text>
      </View>
      <View>
        <Text className={`mb-2 font-medium text-gray-700 ${isTablet ? 'text-base' : 'text-sm'}`}>Port</Text>
        <TextInput
          value={port}
          onChangeText={onPortChange}
          placeholder="e.g., 3000"
          className={`rounded-lg border border-gray-300 bg-gray-50 px-4 text-black ${isTablet ? 'py-4 text-lg' : 'py-3 text-base'}`}
          keyboardType="numeric"
          placeholderTextColor="#9CA3AF"
        />
        <Text className={`mt-1 text-gray-500 ${isTablet ? 'text-sm' : 'text-xs'}`}>Port number where your server is running</Text>
      </View>
      <View className='flex-1 items-center'>
        <TouchableOpacity
          onPress={onSave}
          className={`mt-6 rounded-lg bg-blue-600 shadow-sm active:bg-blue-700 ${isTablet ? 'px-8 py-4' : 'px-4 py-3'}`}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View className='flex-row items-center gap-2'>
              <AntDesign name="save" size={isTablet ? 28 : 24} color="white" />
              <Text className={`text-center font-semibold text-white ${isTablet ? 'text-lg' : 'text-base'}`}>Save Configuration</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default ApiConfigForm;
