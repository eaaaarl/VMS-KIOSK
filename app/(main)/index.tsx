import VisitorInformationModal from "@/features/kiosk/components/VisitorInformation";
import { useVisitorsReturnedModal } from "@/features/visitors/hooks/useVisitorsReturned";
import { useAppSelector } from "@/lib/redux/hook";
import { useRouter } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";

export default function Index() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const { kioskSettingId } = useAppSelector((state) => state.kiosk);
  
  const {
    isInformationModalOpen,
    setIsInformationModalOpen,
    handleReturnAllVisitors,
    isSigningOutAllVisitors,
  } = useVisitorsReturnedModal();

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-blue-400 to-blue-600">
      <View className="flex-1 justify-center px-3">
        <View className={`mb-12 items-center`}>
          <Text className={`text-gray-700 text-2xl font-light mb-1 tracking-wide`}>
            Welcome to
          </Text>
          <Text className={`text-gray-700 text-3xl font-bold text-center tracking-wide`}>
            Visitors Management System
          </Text>
        </View>

        <View className={`flex-row gap-6 w-full justify-center`}>
          {kioskSettingId === 3 ? (
            <></>
          ) : (
            <>
              <TouchableOpacity
                className={`flex-1 py-5 bg-white/90 rounded-2xl items-center max-w-[320px] active:bg-white/80 active:scale-95 transition-transform`}
                onPress={() => router.push('/(visitor)/VisitorRegistrationScreen')}
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
            </>
          )}

          {kioskSettingId === 2 ? (
            <></>
          ) : (
            <>
              <TouchableOpacity
                className={`flex-1 py-5 bg-white/90 rounded-2xl items-center max-w-[320px] active:bg-white/80 active:scale-95 transition-transform`}
                onPress={() => router.push('/(visitor)/SignOutScreen')}
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
            </>
          )}
        </View>

        <TouchableOpacity
          className={`absolute bottom-16 right-10 w-14 h-14 bg-white/30 rounded-full items-center justify-center backdrop-blur-sm active:bg-white/40`}
          onPress={() => router.push('/SelectScreen')}
        >
          <Text className={`text-white text-4xl`}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <VisitorInformationModal
        isOpen={isInformationModalOpen}
        onClose={() => {
          setIsInformationModalOpen(false);
        }}
        onConfirm={handleReturnAllVisitors}
      />

      {isSigningOutAllVisitors && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.35)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <View
            style={{
              backgroundColor: 'rgba(30,30,30,0.85)',
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 13,
              minWidth: 50,
              minHeight: 50,
            }}
          >
            <UIActivityIndicator color="#fff" size={30} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}