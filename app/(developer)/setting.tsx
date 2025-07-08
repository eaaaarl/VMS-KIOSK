import ConfigDisplay from '@/features/developer/components/ConfigDisplay';
import { useDeveloperSetting } from '@/features/developer/hooks/useDeveloperSetting';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SettingDeveloper() {
  const { currentConfig, ipAddress, port, setIpAddress, setPort, handleSave } =
    useDeveloperSetting();
  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <ConfigDisplay currentConfig={currentConfig} className="mb-6" />
        <View className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <View className="mb-4">
            <Text className="text-lg font-semibold text-gray-900 mb-1">
              API Configuration
            </Text>
            <Text className="text-sm text-gray-600">
              Enter your server details to establish connection
            </Text>
          </View>

          <View className="gap-4">
            <View>
              <Text className="mb-2 text-sm font-medium text-gray-700">
                IP Address
              </Text>
              <TextInput
                value={ipAddress}
                onChangeText={setIpAddress}
                placeholder="e.g., 192.168.1.100"
                className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-base text-black"
                keyboardType="url"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#9CA3AF"
              />
              <Text className="mt-1 text-xs text-gray-500">
                Enter the IP address of your development server
              </Text>
            </View>

            <View>
              <Text className="mb-2 text-sm font-medium text-gray-700">
                Port
              </Text>
              <TextInput
                value={port}
                onChangeText={setPort}
                placeholder="e.g., 3000"
                className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-base text-black"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
              <Text className="mt-1 text-xs text-gray-500">
                Port number where your server is running
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleSave}
              className="mt-6 rounded-lg bg-blue-600 py-3 px-4 shadow-sm active:bg-blue-700"
              activeOpacity={0.8}
            >
              <Text className="text-center text-base font-semibold text-white">
                Save Configuration
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
          <View className="flex-row items-start">
            <View className="mr-3 mt-0.5 h-4 w-4 rounded-full bg-blue-400 flex items-center justify-center">
              <Text className="text-xs font-bold text-white">i</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-medium text-blue-800 mb-1">
                Development Tips
              </Text>
              <Text className="text-xs text-blue-700 leading-relaxed">
                • Make sure your development server is running and accessible{'\n'}
                • Use your computer&apos;s local IP address (not localhost) for device testing{'\n'}
                • Ensure both device and server are on the same network{'\n'}
                • Check firewall settings if connection fails
              </Text>
            </View>
          </View>
        </View>

        <View className="h-6" />
      </ScrollView>
    </View>
  );
}