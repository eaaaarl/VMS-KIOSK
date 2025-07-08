import React from 'react';
import { ScrollView, View } from 'react-native';
import ApiConfigForm from './components/ApiConfigForm';
import ConfigDisplay from './components/ConfigDisplay';
import DevelopmentTips from './components/DevelopmentTips';
import { useDeveloperSetting } from './hooks/useDeveloperSetting';

const SettingDeveloper: React.FC = () => {
  const {
    currentConfig,
    ipAddress,
    port,
    isLoading,
    setIpAddress,
    setPort,
    handleSave,
  } = useDeveloperSetting();

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <ConfigDisplay currentConfig={currentConfig} className="mb-6" />
        <ApiConfigForm
          ipAddress={ipAddress}
          port={port}
          isLoading={isLoading}
          onIpAddressChange={setIpAddress}
          onPortChange={setPort}
          onSave={handleSave}
        />
        <DevelopmentTips />
        <View className="h-6" />
      </ScrollView>
    </View>
  );
};

export default SettingDeveloper; 