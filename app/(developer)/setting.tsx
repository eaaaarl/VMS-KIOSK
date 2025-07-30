import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, useWindowDimensions } from 'react-native';
import ApiConfigForm from '../../features/developer/components/ApiConfigForm';
import ConfigDisplay from '../../features/developer/components/ConfigDisplay';
import DevelopmentTips from '../../features/developer/components/DevelopmentTips';
import { useDeveloperSetting } from '../../features/developer/hooks/useDeveloperSetting';

export default function SettingDeveloperScreen() {
  const { currentConfig, ipAddress, port, isLoading, setIpAddress, setPort, handleSave } =
    useDeveloperSetting();

  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768 || height >= 1024;
  const isLandscape = width > height;

  // Responsive layout configuration
  const isLargeScreen = width >= 1024;
  const isMediumScreen = width >= 768 && width < 1024;

  // Layout decisions based on screen size and orientation
  const shouldUseSideBySide = isLargeScreen || (isMediumScreen && isLandscape);

  // Responsive spacing and sizing - compact gaps
  const containerPadding = isLargeScreen ? 16 : isMediumScreen ? 12 : 8;
  const sectionGap = isLargeScreen ? 12 : isMediumScreen ? 8 : 6;
  const bottomPadding = isLargeScreen ? 20 : isMediumScreen ? 16 : 12;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
    >
      <View className="flex-1 bg-gray-50">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            padding: containerPadding,
            paddingBottom: bottomPadding
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={{ marginBottom: sectionGap }}>
            <ConfigDisplay
              currentConfig={currentConfig}
              className="mb-4"
              isTablet={isTablet}
            />
          </View>

          {/* Main Content - Responsive Layout */}
          {shouldUseSideBySide ? (
            // Side-by-side layout for large screens or medium screens in landscape
            <View className="flex-row" style={{ gap: sectionGap }}>
              {/* Left Column - API Configuration */}
              <View className="flex-1">
                <ApiConfigForm
                  ipAddress={ipAddress}
                  port={port}
                  isLoading={isLoading}
                  onIpAddressChange={setIpAddress}
                  onPortChange={setPort}
                  onSave={handleSave}
                  isTablet={isTablet}
                />
              </View>

              {/* Right Column - Development Tips */}
              <View className="flex-1">
                <DevelopmentTips isTablet={isTablet} />
              </View>
            </View>
          ) : (
            // Stacked layout for small screens or medium screens in portrait
            <View style={{ gap: sectionGap }}>
              {/* API Configuration Section */}
              <ApiConfigForm
                ipAddress={ipAddress}
                port={port}
                isLoading={isLoading}
                onIpAddressChange={setIpAddress}
                onPortChange={setPort}
                onSave={handleSave}
                isTablet={isTablet}
              />

              {/* Development Tips Section */}
              <DevelopmentTips isTablet={isTablet} />
            </View>
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
