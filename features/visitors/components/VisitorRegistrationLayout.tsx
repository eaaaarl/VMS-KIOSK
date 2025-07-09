import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type VisitorRegistrationLayoutProps = {
  children: React.ReactNode;
};

export default function VisitorRegistrationLayout({ children }: VisitorRegistrationLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-gradient-to-br bg-white from-blue-400 to-blue-600">
      <View
        className="flex-1 flex-row"
        style={{
          paddingTop: insets.top,
          paddingBottom: Math.max(insets.bottom, 20) // Ensure minimum bottom padding
        }}
      >
        {children}
      </View>
    </View>
  );
} 