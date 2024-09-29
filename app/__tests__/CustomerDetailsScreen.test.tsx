import React from "react";
import { render } from "@testing-library/react-native";
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
    // Mock the fetchBookings action
    jest
      .spyOn(require("@/store/slices/bookingSlice"), "fetchBookings")
      .mockImplementation(() => ({ type: "fetchBookings" }));
  });

  it("renders loading indicator when loading", () => {
    const store = createTestStore({
      bookings: {
        loading: true,
        error: null,
        futureBookings: [],
        historicBookings: [],
      },
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
      bookings: {
        loading: false,
        error: "Error fetching bookings",
        futureBookings: [],
        historicBookings: [],
      },
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <CustomerDetailsScreen />
      </Provider>,
    );
    expect(getByTestId("error-message")).toBeTruthy();
    expect(getByTestId("error-message").props.children).toEqual(
      "Error fetching bookings",
    );
  });

  it("renders future and historic bookings", () => {
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
    expect(getByTestId("bookings-list-1")).toBeTruthy();
    expect(getByTestId("bookings-list-2")).toBeTruthy();
  });

  it("matches the snapshot", () => {
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
    expect(toJSON()).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
