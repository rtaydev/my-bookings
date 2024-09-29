import { Slot } from "expo-router";
import "../msw.polyfills";
import { server } from "../mocks/server";
import { Provider } from "react-redux";
import { store, persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

server.listen();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1, backgroundColor }}>
          <Slot />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}
