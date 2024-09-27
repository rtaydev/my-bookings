import { Stack } from "expo-router";
import "../msw.polyfills";
import { server } from "../server/mocks/server";

server.listen();

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="My Ferry Trips" />
    </Stack>
  );
}
