import React from "react";
import { render, waitFor, act } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CustomerDetailsScreen from "../customer-details";
import rootReducer from "@/store/reducers";

// Mock the expo-router hook
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(() => ({
    surname: "Smith",
    bookingReference: "ABC123",
  })),
}));

const createTestStore = (initialState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: {
      bookings: {
        futureBookings: [],
        historicBookings: [],
        loading: false,
        error: null,
        lastFetched: null,
        ...initialState.bookings,
      },
      searchParams: {
        surname: "",
        bookingReference: "",
        ...initialState.searchParams,
      },
    },
  });
};

describe("CustomerDetailsScreen", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    jest
      .spyOn(require("@/store/slices/bookingSlice"), "fetchBookings")
      .mockImplementation(() => ({ type: "fetchBookings" }));
  });

  it("renders loading indicator when loading", async () => {
    const store = configureStore({
      reducer: rootReducer, // Add this line to fix the issue
      preloadedState: {
        bookings: {
          loading: true,
          futureBookings: [],
          historicBookings: [],
        },
      },
      searchParams: {
        surname: "Smith",
        bookingReference: "ABC123",
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <CustomerDetailsScreen />
      </Provider>,
    );

    // Wait for loading state
    await waitFor(() => expect(getByTestId("loading-indicator")).toBeTruthy());
  });

  it("renders error message when there is an error", async () => {
    const store = configureStore({
      reducer: rootReducer, // Add this line to fix the issue
      preloadedState: {
        bookings: {
          loading: false,
          error: "Error fetching bookings",
          futureBookings: [],
          historicBookings: [],
        },
      },
      searchParams: {
        surname: "Smith",
        bookingReference: "ABC123",
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <CustomerDetailsScreen />
      </Provider>,
    );

    // Wait for error state
    await waitFor(() => {
      expect(getByTestId("error-message")).toBeTruthy();
      expect(getByTestId("error-message").props.children).toEqual(
        "Error fetching bookings",
      );
    });
  });

  it("renders future and historic bookings", async () => {
    const store = createTestStore({
      bookings: {
        loading: false,
        error: null,
        futureBookings: [
          {
            id: "1",
            bookingReference: "ABC123",
            title: "Dover to Calais",
            date: "2024-11-05",
            time: "08:00",
            passengers: 2,
            vehicle: "Car",
            details: "Standard vehicle ferry crossing",
            ticketUuid: "8f7e6d5c-4b3a-2a1e-9f8d-7c6b5a4e3d2c",
          },
        ],
        historicBookings: [
          {
            id: "2",
            bookingReference: "DEF456",
            title: "Calais to Dover",
            date: "2024-10-05",
            time: "18:00",
            passengers: 2,
            vehicle: "Car",
            details: "Return journey - Standard vehicle ferry crossing",
            ticketUuid: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
          },
        ],
      },
      searchParams: {
        surname: "Smith",
        bookingReference: "ABC123",
      },
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <CustomerDetailsScreen />
      </Provider>,
    );

    await waitFor(() => expect(getByTestId("bookings-list-1")).toBeTruthy());
    await waitFor(() => expect(getByTestId("bookings-list-2")).toBeTruthy());
  });

  it("matches the snapshot", async () => {
    const store = createTestStore({
      loading: false,
      error: null,
      futureBookings: [
        {
          id: "1",
          bookingReference: "ABC123",
          title: "Dover to Calais",
          date: "2024-11-05",
          time: "08:00",
          passengers: 2,
          vehicle: "Car",
          details: "Standard vehicle ferry crossing",
          ticketUuid: "8f7e6d5c-4b3a-2a1e-9f8d-7c6b5a4e3d2c",
        },
      ],
      historicBookings: [
        {
          id: "2",
          bookingReference: "DEF456",
          title: "Dover to Calais",
          date: "2024-11-05",
          time: "08:00",
          passengers: 2,
          vehicle: "Car",
          details: "Standard vehicle ferry crossing",
        },
      ],
    });
    const { toJSON } = render(
      <Provider store={store}>
        <CustomerDetailsScreen />
      </Provider>,
    );
    await waitFor(() => expect(toJSON()).toMatchSnapshot());
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.runOnlyPendingTimers(); // Complete all pending timers
    jest.useRealTimers();
  });
});
