import { useGetVisitorsReturnedQuery } from "@/features/visitors/api/visitorApi";
import { formattedDate } from "@/features/visitors/utils/FormattedDate";
import { useAppSelector } from "@/lib/redux/hook";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";

let hasShownVisitorInfoGlobal = false;

export default function Index() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const { kioskSettingId } = useAppSelector((state) => state.kiosk);
  const [componentMounted, setComponentMounted] = useState(false);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  useEffect(() => {
    if (!kioskSettingId && componentMounted) {
      const timeoutId = setTimeout(() => {
        router.replace('/(setting)/SettingKiosk');
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [kioskSettingId, router, componentMounted]);

  const todaysDate = formattedDate(new Date());
  const { data: visitorsReturned, isLoading, isSuccess } = useGetVisitorsReturnedQuery(
    { date: todaysDate },
    {
      skip: !kioskSettingId || !componentMounted,
    }
  );

  const countReturned = visitorsReturned?.results?.length || 0;

  useEffect(() => {
    if (
      componentMounted &&
      kioskSettingId &&
      isSuccess &&
      !isLoading &&
      !hasShownVisitorInfoGlobal &&
      countReturned > 0
    ) {
      console.log('Redirecting to VisitorInformation. Unreturned visitors:', countReturned);

      const timeoutId = setTimeout(() => {
        hasShownVisitorInfoGlobal = true;
        router.push('/VisitorInformationScreen');
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [componentMounted, kioskSettingId, isSuccess, isLoading, countReturned, router]);



  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-blue-400 to-blue-600">
      <View className="flex-1 justify-center px-3">
        <View className={`${isLandscape ? 'mb-3' : 'mb-12'} items-center`}>
          <Text className={`text-gray-700 ${isLandscape ? 'text-2xl' : 'text-2xl'} font-light mb-1 tracking-wide`}>
            Welcome to
          </Text>
          <Text className={`text-gray-700 ${isLandscape ? 'text-3xl' : 'text-3xl'} font-bold text-center tracking-wide`}>
            Visitors Management System
          </Text>
        </View>

        <View className={`flex-row ${isLandscape ? 'gap-4' : 'gap-6'} w-full justify-center`}>
          <TouchableOpacity
            className={`flex-1 bg-white/90 rounded-2xl ${isLandscape ? 'p-5' : 'p-8'} items-center shadow-lg max-w-[320px] active:bg-white/80 active:scale-95 transition-transform`}
            onPress={() => router.push('/(visitor)/VisitorRegistration')}
          >
            <View className={`${isLandscape ? 'w-16 h-16' : 'w-20 h-20'} bg-blue-100 rounded-xl items-center justify-center ${isLandscape ? 'mb-3' : 'mb-6'}`}>
              <View className="w-8 h-8 bg-blue-500 rounded items-center justify-center">
                <Text className="text-white text-lg">👤</Text>
              </View>
            </View>

            <Text className={`text-gray-800 ${isLandscape ? 'text-2xl' : 'text-2xl'} font-bold mb-2 tracking-wide`}>
              SIGN IN
            </Text>
            <Text className={`text-gray-600 text-center text-base`}>
              Register and Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 bg-white/90 rounded-2xl ${isLandscape ? 'p-5' : 'p-8'} items-center shadow-lg max-w-[320px] active:bg-white/80 active:scale-95 transition-transform`}
            onPress={() => alert('Sign Out pressed!')}
          >
            <View className={`${isLandscape ? 'w-16 h-16' : 'w-20 h-20'} bg-green-100 rounded-xl items-center justify-center ${isLandscape ? 'mb-3' : 'mb-6'}`}>
              <View className="w-8 h-8 bg-green-500 rounded items-center justify-center">
                <Text className="text-white text-lg">🚪</Text>
              </View>
            </View>

            <Text className={`text-gray-800 ${isLandscape ? 'text-2xl' : 'text-2xl'} font-bold mb-2 tracking-wide`}>
              SIGN OUT
            </Text>
            <Text className={`text-gray-600 text-center text-base`}>
              Sign Out Properly
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className={`absolute ${isLandscape ? 'top-3 right-5 w-10 h-10' : 'bottom-5 right-10'} bg-white/30 rounded-full items-center justify-center backdrop-blur-sm active:bg-white/40`}
          onPress={() => router.push('/SelectScreen')}
        >
          <Text className={`text-white ${isLandscape ? 'text-xl' : 'text-4xl'}`}>⚙️</Text>
        </TouchableOpacity>



      </View>
    </SafeAreaView>
  );
}