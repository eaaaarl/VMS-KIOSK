import { useConfig } from '@/features/config/hooks/useConfig';
import {
  useGetVisitorsLogByDayQuery,
  useGetVisitorsReturnedQuery,
  useGetVisitorsTodaysQuery,
} from '@/features/visitors/api/visitorApi';
import { formattedDate } from '@/features/visitors/utils/FormattedDate';
import React from 'react';
import { Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface VisitorInformationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function VisitorInformationModal({
  isOpen,
  onClose,
  onConfirm,
}: VisitorInformationModalProps) {
  const { getIdTotalCount } = useConfig();
  const { data: visitorsReturned } = useGetVisitorsReturnedQuery({
    date: formattedDate(new Date()),
  });
  const countReturned = visitorsReturned?.results?.length || 0;
  const unreturnedPercentageCount = (countReturned / (getIdTotalCount as any)) * 100;

  const { data: visitorsTodays } = useGetVisitorsTodaysQuery({ date: formattedDate(new Date()) });

  const countTodays =
    visitorsTodays?.results?.filter(vt => !vt.returned?.data?.[0] === true).length || 0;

  const todaysPercentageCount = (countTodays / (getIdTotalCount as any)) * 100;
  const numbersAvailable = (getIdTotalCount as any) - (countReturned + countTodays);
  const availablePercentageCount = (numbersAvailable / (getIdTotalCount as any)) * 100;

  const { data: maxDailyLog } = useGetVisitorsLogByDayQuery();
  const daysToMakeAllNumbersUnavailable = numbersAvailable / (maxDailyLog?.maxDailyLog as any);

  return (
    <Modal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
      <SafeAreaView className="flex-1 justify-center bg-black/50">
        <ScrollView className="flex-1 px-4">
          <View className="mt-10 flex-1 items-center justify-center">
            <View className="w-full overflow-hidden rounded-2xl bg-white">
              <View className="flex-row items-center justify-between bg-red-400 px-4 py-4">
                <Text className="text-xl font-bold tracking-wider text-white">
                  NUMBER INFORMATION
                </Text>
                <TouchableOpacity onPress={onClose} className="p-1">
                  <Text className="text-2xl font-light text-white">×</Text>
                </TouchableOpacity>
              </View>

              <View className="bg-gray-50 px-4 py-6">
                <View className="mb-4 flex-row flex-wrap items-baseline">
                  <Text className="text-base text-gray-700">There are </Text>
                  <Text className="text-xl font-semibold text-red-500">{countReturned}</Text>
                  <Text className="text-base text-gray-700">
                    {' '}
                    not signed out/unreturned numbers,{' '}
                  </Text>
                  <Text className="text-xl font-semibold text-blue-400">
                    {unreturnedPercentageCount.toFixed(2)}%
                  </Text>
                  <Text className="text-base text-gray-700"> of </Text>
                  <Text className="text-xl font-semibold text-blue-500">{getIdTotalCount}</Text>
                  <Text className="text-base text-gray-700"> total id count.</Text>
                </View>

                <View className="mb-3 flex-row flex-wrap items-baseline">
                  <Text className="text-xl font-semibold text-blue-500">{countTodays}</Text>
                  <Text className="text-base text-gray-700"> numbers are used for today, </Text>
                  <Text className="text-xl font-semibold text-blue-400">
                    {todaysPercentageCount.toFixed(2)}%
                  </Text>
                  <Text className="text-base text-gray-700"> of </Text>
                  <Text className="text-xl font-semibold text-blue-500">{getIdTotalCount}</Text>
                  <Text className="text-base text-gray-700"> total id count.</Text>
                </View>

                <View className="mb-6 flex-row flex-wrap items-baseline">
                  <Text className="text-xl font-semibold text-blue-500">{numbersAvailable}</Text>
                  <Text className="text-base text-gray-700"> numbers are available, </Text>
                  <Text className="text-xl font-semibold text-blue-400">
                    {availablePercentageCount.toFixed(2)}%
                  </Text>
                  <Text className="text-base text-gray-700"> of </Text>
                  <Text className="text-xl font-semibold text-blue-500">{getIdTotalCount}</Text>
                  <Text className="text-base text-gray-700"> total id count.</Text>
                </View>

                <View className="mb-6 flex-row flex-wrap items-baseline">
                  <Text className="text-base text-gray-700">
                    On a daily log basis, base on the log count per day, it will only take
                    approximately{' '}
                  </Text>
                  <Text className="text-xl font-bold text-red-500">
                    {daysToMakeAllNumbersUnavailable.toFixed(0)} days
                  </Text>
                  <Text className="text-base text-gray-700"> to make all numbers unavailable.</Text>
                </View>

                <View className="mb-6 flex-row flex-wrap items-baseline">
                  <Text className="text-base text-gray-700">Would you like to return all </Text>
                  <Text className="text-xl font-semibold text-red-500">{countReturned}</Text>
                  <Text className="text-base text-gray-700">
                    {' '}
                    not signed out/unreturned numbers?
                  </Text>
                </View>

                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={onClose}
                    className="rounded-full bg-blue-500 px-4 py-3"
                  >
                    <Text className="text-center text-base font-medium text-white">
                      Close
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={onConfirm}
                    className="rounded-full bg-red-400 px-4 py-3"
                  >
                    <Text className="text-center text-base font-medium text-white">
                      Return all {countReturned} numbers
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
