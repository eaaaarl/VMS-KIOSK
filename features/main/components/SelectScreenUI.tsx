import React from 'react';
import { ActivityIndicator, Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';


interface SelectScreenProps {
  countReturned: number;
  onClose: () => void;
  onSetKioskFunction: () => void;
  onPrinterManagement: () => void;
  onIpPortConfiguration: () => void;
  onReturnIds: () => void;
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  unreturnedIds: { id: string; remarks: string }[] | undefined;
  confirmReturnAllIds: () => void;
  isSigningOutAllVisitors: boolean;
}

export default function SelectScreenUI({
  countReturned,
  onClose,
  onSetKioskFunction,
  onPrinterManagement,
  onIpPortConfiguration,
  onReturnIds,
  isModalVisible,
  setIsModalVisible,
  unreturnedIds,
  confirmReturnAllIds,
  isSigningOutAllVisitors,
}: SelectScreenProps) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-100">
      <View className="mx-4 w-full max-w-md overflow-hidden rounded-t-2xl bg-white shadow-2xl">
        <View className="flex-row items-center justify-between bg-blue-500 px-6 py-4">
          <Text className="text-xl font-semibold text-white">SELECT</Text>
          <TouchableOpacity
            onPress={onClose}
            className="h-8 w-8 items-center justify-center rounded-full bg-white/20"
          >
            <Text className="text-lg font-bold text-white">x</Text>
          </TouchableOpacity>
        </View>

        <View className="gap-4 p-6">
          <TouchableOpacity
            onPress={onSetKioskFunction}
            className="items-center rounded-full border border-blue-200 bg-blue-50 px-6 py-4"
          >
            <Text className="text-lg font-medium text-gray-800">Set KIOSK Function</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPrinterManagement}
            className="items-center rounded-full border border-green-200 bg-green-50 px-6 py-4"
          >
            <Text className="text-lg font-medium text-gray-800">Printer Management</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onIpPortConfiguration}
            className="items-center rounded-full border border-purple-200 bg-purple-50 px-6 py-4"
          >
            <Text className="text-lg font-medium text-gray-800">
              IP Address & Port Configuration
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onReturnIds}
            className="flex-row items-center justify-center rounded-full border border-pink-200 bg-pink-50 px-6 py-4"
            disabled={countReturned === 0}
          >
            <Text className="text-lg font-medium text-gray-800">Return IDs</Text>
            <View className="ml-2 h-6 w-6 items-center justify-center rounded-full bg-pink-500">
              <Text className="text-sm font-bold text-white">{countReturned}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <View className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl">

            {/* Header */}
            <View className="bg-red-400 px-6 py-4 flex-row justify-between items-center">
              <Text className="text-white text-xl font-semibold">UNRETURNED IDS</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="w-8 h-8 justify-center items-center"
              >
                <Text className="text-white text-2xl font-bold">×</Text>
              </TouchableOpacity>
            </View>

            {/* Table Container */}
            <View className="bg-pink-50 max-h-96">
              {/* Table Header */}
              <View className="flex-row border-b border-gray-300 bg-pink-100">
                <View className="flex-1 px-4 py-3 border-r border-gray-300">
                  <Text className="font-semibold text-gray-700 text-center">#</Text>
                </View>
                <View className="flex-[2] px-4 py-3">
                  <Text className="font-semibold text-gray-700 text-center">Remarks</Text>
                </View>
              </View>

              {/* Table Body - Scrollable */}
              <ScrollView className="max-h-80">
                {unreturnedIds?.map((item, index) => (
                  <View
                    key={index}
                    className={`flex-row border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-pink-25'}`}
                  >
                    <View className="flex-1 px-4 py-3 border-r border-gray-200 justify-center">
                      <Text className="text-gray-800 text-center">{item.id}</Text>
                    </View>
                    <View className="flex-[2] px-4 py-3 justify-center items-center">
                      <Text className="text-gray-600">{item.remarks}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Footer with Return Button */}
            <View className="bg-pink-50 px-6 py-4 items-center">
              <TouchableOpacity
                className={`bg-red-400 px-8 py-3 rounded-full shadow-lg ${isSigningOutAllVisitors ? 'opacity-50' : ''}`}
                onPress={() => {
                  confirmReturnAllIds();
                  setIsModalVisible(false);
                }}
                disabled={isSigningOutAllVisitors}
              >
                <Text className="text-white font-semibold text-lg">{isSigningOutAllVisitors ? <ActivityIndicator size="small" color="white" /> : 'Return'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
