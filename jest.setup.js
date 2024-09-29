import "@testing-library/jest-native/extend-expect";
import { beforeEach, jest } from "@jest/globals";

import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  Reanimated.default.useScrollViewOffset = () => 0;
  Reanimated.default.useAnimatedRef = () => ({ current: null });
  Reanimated.default.useAnimatedStyle = () => ({ style: {} });
  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("react-native-qrcode-svg", () => "QRCode");

jest.mock("@react-native-async-storage/async-storage", () => {
  return {
    setItem: jest.fn(() => Promise.resolve(null)),
    getItem: jest.fn(() => Promise.resolve(null)),
    removeItem: jest.fn(() => Promise.resolve(null)),
    clear: jest.fn(() => Promise.resolve(null)),
    getAllKeys: jest.fn(() => Promise.resolve([])),
    multiSet: jest.fn(() => Promise.resolve(null)),
    multiGet: jest.fn(() => Promise.resolve([])),
    multiRemove: jest.fn(() => Promise.resolve(null)),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});
