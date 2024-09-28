import React from "react";
import renderer, { act } from "react-test-renderer";
import BookingDetailsScreen from "../booking-details";
import { useLocalSearchParams } from "expo-router";

// Mock the useLocalSearchParams hook
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
}));

jest.mock("react-native-qrcode-svg", () => "QRCode");

// Mock the fetch function to return test booking data
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        bookingReference: "ABC123",
        title: "Dover to Calais",
        date: "2024-11-05",
        time: "08:00",
        passengers: 2,
        vehicle: "Car",
        details: "Standard vehicle ferry crossing",
        ticketUuid: "8f7e6d5c-4b3a-2a1e-9f8d-7c6b5a4e3d2c",
      }),
  }),
);

describe("BookingDetailsScreen", () => {
  it("renders QR code correctly", async () => {
    // Mock the useLocalSearchParams hook to return test params
    useLocalSearchParams.mockReturnValue({ bookingId: "1", userId: "1" });

    let tree;
    await act(async () => {
      tree = renderer.create(<BookingDetailsScreen />);
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
