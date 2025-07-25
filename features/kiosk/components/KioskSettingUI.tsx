import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { KioskOptionsList } from './KioskOptionsList';
import { KioskSettingActions } from './KioskSettingActions';
import { KioskSettingHeader } from './KioskSettingHeader';

type KioskOption = {
  id: number;
  name: string;
  strTransactionType: string;
};

type KioskSettingUIProps = {
  options: KioskOption[];
  selectedOptionId: number | null;
  onClose: () => void;
  onSave: () => void;
  onOptionSelect: (optionId: number) => void;
};

const styles = StyleSheet.create({
  shadowContainer: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export const KioskSettingUI: React.FC<KioskSettingUIProps> = ({
  options,
  selectedOptionId,
  onClose,
  onSave,
  onOptionSelect,
}) => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-black/50">
      <View
        className="mx-4 w-full max-w-4xl overflow-hidden rounded-2xl bg-white"
        style={styles.shadowContainer}
      >
        <KioskSettingHeader onClose={onClose} />

        <View className="p-6">
          <View className="overflow-hidden rounded-lg border border-gray-300">
            <View className="flex-row border-b border-gray-300 bg-gray-100 px-4 py-3">
              <View className="w-12"></View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-800">Name</Text>
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-800">Transaction Type</Text>
              </View>
            </View>

            <KioskOptionsList
              options={options}
              selectedOptionId={selectedOptionId}
              onOptionSelect={onOptionSelect}
            />
          </View>

          <KioskSettingActions
            onCancel={onClose}
            onSave={onSave}
            isSaveEnabled={selectedOptionId !== null}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
