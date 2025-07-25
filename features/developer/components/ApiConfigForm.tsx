import React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ApiConfigFormProps {
  ipAddress: string;
  port: string;
  isLoading: boolean;
  onIpAddressChange: (value: string) => void;
  onPortChange: (value: string) => void;
  onSave: () => void;
}

const ApiConfigForm: React.FC<ApiConfigFormProps> = ({
  ipAddress,
  port,
  isLoading,
  onIpAddressChange,
  onPortChange,
  onSave,
}) => (
  <View className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <View className="mb-4">
      <Text className="mb-1 text-lg font-semibold text-gray-900">API Configuration</Text>
      <Text className="text-sm text-gray-600">
        Enter your server details to establish connection
      </Text>
    </View>
    <View className="gap-4">
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">IP Address</Text>
        <TextInput
          value={ipAddress}
          onChangeText={onIpAddressChange}
          placeholder="e.g., 192.168.1.100"
          className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-base text-black"
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#9CA3AF"
        />
        <Text className="mt-1 text-xs text-gray-500">
          Enter the IP address of your development server
        </Text>
      </View>
      <View>
        <Text className="mb-2 text-sm font-medium text-gray-700">Port</Text>
        <TextInput
          value={port}
          onChangeText={onPortChange}
          placeholder="e.g., 3000"
          className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-base text-black"
          keyboardType="numeric"
          placeholderTextColor="#9CA3AF"
        />
        <Text className="mt-1 text-xs text-gray-500">Port number where your server is running</Text>
      </View>
      <TouchableOpacity
        onPress={onSave}
        className="mt-6 rounded-lg bg-blue-600 px-4 py-3 shadow-sm active:bg-blue-700"
        activeOpacity={0.8}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-center text-base font-semibold text-white">Save Configuration</Text>
        )}
      </TouchableOpacity>
    </View>
  </View>
);

export default ApiConfigForm;
