import { store as reduxStore } from "@/lib/redux/store";
import { Stack } from "expo-router";
import { Provider as ReduxProvider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "../global.css";

const persistor = persistStore(reduxStore);
export default function RootLayout() {
  return (
    <ReduxProvider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack screenOptions={{ headerShown: false }} />
      </PersistGate>
    </ReduxProvider>
  );
}
