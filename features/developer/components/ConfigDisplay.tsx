import React from 'react';
import { Text, View } from 'react-native';

interface ConfigDisplayProps {
  currentConfig: {
    ipAddress: string;
    port: string;
  };
  className?: string;
  isTablet?: boolean;
}

export default function ConfigDisplay({ currentConfig, className = '', isTablet = false }: ConfigDisplayProps) {
  const { ipAddress, port } = currentConfig;
  const isConfigured = ipAddress && port;

  return (
    <View
      className={`rounded-lg border ${isConfigured ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'} ${className} ${isTablet ? 'p-6' : 'p-4'}`}
    >
      <View className="mb-2 flex-row items-center">
        <View
          className={`mr-2 rounded-full ${isConfigured ? 'bg-green-500' : 'bg-gray-400'} ${isTablet ? 'h-3 w-3' : 'h-2 w-2'}`}
        />
        <Text
          className={`font-medium ${isConfigured ? 'text-green-800' : 'text-gray-600'} ${isTablet ? 'text-base' : 'text-sm'}`}
        >
          {isConfigured ? 'Configuration Active' : 'No Configuration'}
        </Text>
      </View>

      {isConfigured ? (
        <View>
          <Text className={`mb-1 text-green-700 ${isTablet ? 'text-sm' : 'text-xs'}`}>Current API Endpoint:</Text>
          <Text className={`font-mono text-green-800 ${isTablet ? 'text-base' : 'text-sm'}`}>
            http://{ipAddress}:{port}
          </Text>
        </View>
      ) : (
        <Text className={`text-gray-500 ${isTablet ? 'text-sm' : 'text-xs'}`}>
          Configure your API settings below to establish connection
        </Text>
      )}
    </View>
  );
}
