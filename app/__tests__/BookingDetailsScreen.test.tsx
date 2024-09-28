import React from "react";
import { render, waitFor, act } from "@testing-library/react-native";
import BookingDetailsScreen from "../booking-details";
import { useLocalSearchParams } from "expo-router";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from "@/store/slices/bookingSlice";

// Mock the expo-router hook
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(() => ({
    bookingId: "ABC123",
    userId: "1",
  })),
}));

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

const createTestStore = (initialState) => {
  return configureStore({
    reducer: {
      bookings: bookingsReducer,
    },
    preloadedState: {
      bookings: initialState,
    },
  });
};

describe("BookingDetailsScreen", () => {
  const originalError = console.error;
  let store;

  beforeAll(() => {
    console.error = jest.fn();
  });

  beforeEach(() => {
    store = createTestStore({
      booking: null,
      loading: false,
      error: null,
    });
  });

  afterAll(() => {
    console.error = originalError;
  });

  it("renders QR code correctly", async () => {
    // Mock the useLocalSearchParams hook to return test params
    jest.mock("expo-router", () => ({
      useLocalSearchParams: jest.fn(() => ({
        bookingId: "ABC123",
        userId: "1",
      })),
    }));

    const { getByTestId } = render(
      <Provider store={store}>
        <BookingDetailsScreen />
      </Provider>,
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3001/users/1/bookings/ABC123",
      );
      expect(getByTestId("qr-code")).toBeTruthy();
    });
  });

  it("handles fetch error", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: "Not Found",
      }),
    );

    const { getByTestId } = render(
      <Provider store={store}>
        <BookingDetailsScreen />
      </Provider>,
    );

    await waitFor(() => {
      expect(getByTestId("error-text")).toBeTruthy();
    });
  });
});
