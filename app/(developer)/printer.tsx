import React from 'react';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { BluetoothControls } from '../../features/developer/components/BluetoothControls';
import { DebugInfo } from '../../features/developer/components/DebugInfo';
import { DeviceList } from '../../features/developer/components/DeviceList';
import { PrintingControls } from '../../features/developer/components/PrintingControls';
import { useBluetoothPrinter } from '../../features/developer/hooks/useBluetoothPrinter';

export default function PrinterScreen() {
  const {
    isBluetoothEnabled,
    devices,
    connectedDevice,
    isScanning,
    isConnecting,
    debugInfo,
    enableBluetooth,
    startDiscovery,
    connectToDevice,
    disconnectDevice,
    printVisitorPass,
    printVisitorBarcode,
    printVisitorQR,
    clearDebugInfo,
  } = useBluetoothPrinter();

  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768 || height >= 1024;
  const isLandscape = width > height;
  
  // Responsive layout configuration
  const isLargeScreen = width >= 1024;
  const isMediumScreen = width >= 768 && width < 1024;
  const isSmallScreen = width < 768;
  
  // Layout decisions based on screen size and orientation
  const shouldUseSideBySide = isLargeScreen || (isMediumScreen && isLandscape);
  const shouldUseStacked = isSmallScreen || (isMediumScreen && !isLandscape);
  
  // Responsive spacing and sizing - reduced gaps
  const containerPadding = isLargeScreen ? 24 : isMediumScreen ? 20 : 16;
  const sectionGap = isLargeScreen ? 20 : isMediumScreen ? 16 : 12;
  const headerGap = isLargeScreen ? 20 : isMediumScreen ? 16 : 12;

  return (
    <ScrollView 
      className="flex-1 bg-gray-100" 
      contentContainerStyle={{ padding: containerPadding }}
    >
      {/* Header Section */}
      <View style={{ marginBottom: headerGap }}>
        <Text 
          className={`font-bold text-gray-800 ${
            isLargeScreen ? 'text-4xl' : isMediumScreen ? 'text-3xl' : 'text-2xl'
          }`}
          style={{ marginBottom: 12 }}
        >
          Printer Management
        </Text>
        <View 
          className={`${shouldUseStacked ? 'flex-col' : 'flex-row'}`}
          style={{ gap: sectionGap }}
        >
          <View 
            className="flex-1 rounded-lg bg-white shadow-sm"
            style={{ padding: isLargeScreen ? 24 : 16 }}
          >
            <Text 
              className={`font-semibold text-gray-700 ${
                isLargeScreen ? 'text-xl' : 'text-lg'
              }`}
            >
              Bluetooth Status
            </Text>
            <Text 
              className={`text-gray-600 ${
                isLargeScreen ? 'text-lg' : 'text-base'
              }`}
            >
              Status: {isBluetoothEnabled ? 'Enabled' : 'Disabled'}
            </Text>
          </View>
          <View 
            className="flex-1 rounded-lg bg-white shadow-sm"
            style={{ padding: isLargeScreen ? 24 : 16 }}
          >
            <Text 
              className={`font-semibold text-gray-700 ${
                isLargeScreen ? 'text-xl' : 'text-lg'
              }`}
            >
              Connection
            </Text>
            <Text 
              className={`text-gray-600 ${
                isLargeScreen ? 'text-lg' : 'text-base'
              }`}
            >
              {connectedDevice ? connectedDevice.name : 'Not Connected'}
            </Text>
          </View>
        </View>
      </View>

      {/* Main Content - Responsive Layout */}
      {shouldUseSideBySide ? (
        // Side-by-side layout for large screens or medium screens in landscape
        <View className="flex-row" style={{ gap: sectionGap }}>
          {/* Left Column - Controls and Devices */}
          <View className="flex-1">
            <BluetoothControls
              isBluetoothEnabled={isBluetoothEnabled}
              isScanning={isScanning}
              isConnecting={isConnecting}
              connectedDevice={connectedDevice}
              onEnableBluetooth={enableBluetooth}
              onStartDiscovery={startDiscovery}
              onDisconnect={disconnectDevice}
            />
            <DeviceList
              devices={devices}
              connectedDevice={connectedDevice}
              isConnecting={isConnecting}
              onConnect={connectToDevice}
            />
          </View>

          {/* Right Column - Printing and Debug */}
          <View className="flex-1">
            <PrintingControls
              connected={!!connectedDevice}
              onPrintPass={printVisitorPass}
              onPrintBarcode={printVisitorBarcode}
              onPrintQR={printVisitorQR}
            />
            <DebugInfo debugInfo={debugInfo} onClear={clearDebugInfo} />
          </View>
        </View>
      ) : (
        // Stacked layout for small screens or medium screens in portrait
        <View style={{ gap: sectionGap }}>
          {/* Bluetooth Controls Section */}
          <BluetoothControls
            isBluetoothEnabled={isBluetoothEnabled}
            isScanning={isScanning}
            isConnecting={isConnecting}
            connectedDevice={connectedDevice}
            onEnableBluetooth={enableBluetooth}
            onStartDiscovery={startDiscovery}
            onDisconnect={disconnectDevice}
          />
          
          {/* Device List Section */}
          <DeviceList
            devices={devices}
            connectedDevice={connectedDevice}
            isConnecting={isConnecting}
            onConnect={connectToDevice}
          />
          
          {/* Printing Controls Section */}
          <PrintingControls
            connected={!!connectedDevice}
            onPrintPass={printVisitorPass}
            onPrintBarcode={printVisitorBarcode}
            onPrintQR={printVisitorQR}
          />
          
          {/* Debug Info Section */}
          <DebugInfo debugInfo={debugInfo} onClear={clearDebugInfo} />
        </View>
      )}
    </ScrollView>
  );
}
