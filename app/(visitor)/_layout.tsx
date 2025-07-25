import { Stack } from 'expo-router';
import React from 'react';

export default function LayoutVisitor() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
