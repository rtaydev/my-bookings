import React from "react";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CustomerDetailsScreen from "../customer-details";
import bookingsReducer from "@/store/slices/bookingSlice"; // Adjust this import path as needed

// Mock the expo-router hook
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(() => ({
    surname: "Test",
    bookingReference: "123",
  })),
}));

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

describe("CustomerDetailsScreen", () => {
  beforeEach(() => {
    // Mock the fetchBookings action
    jest
      .spyOn(require("@/store/slices/bookingSlice"), "fetchBookings")
      .mockImplementation(() => ({ type: "fetchBookings" }));
  });

  it("renders loading indicator when loading", () => {
    const store = createTestStore({
      loading: true,
      error: null,
      futureBookings: [],
      historicBookings: [],
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <CustomerDetailsScreen />
      </Provider>,
    );
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("renders error message when there is an error", () => {
    const store = createTestStore({
      loading: false,
      error: "Error fetching bookings",
      futureBookings: [],
      historicBookings: [],
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <CustomerDetailsScreen />
      </Provider>,
    );
    expect(getByTestId("error-message")).toBeTruthy();
    expect(getByTestId("error-message").props.children).toEqual([
      "Error: ",
      "Error fetching bookings",
    ]);
  });

  it("renders future and historic bookings", () => {
    const store = createTestStore({
      loading: false,
      error: null,
      futureBookings: [{ id: "1", title: "Future Booking" }],
      historicBookings: [{ id: "2", title: "Historic Booking" }],
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <CustomerDetailsScreen />
      </Provider>,
    );
    expect(getByTestId("future-booking-1")).toBeTruthy();
    expect(getByTestId("historic-booking-2")).toBeTruthy();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
