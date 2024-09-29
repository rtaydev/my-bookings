import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const API_URL = "http://localhost:3001";

interface Booking {
  id: string;
  title: string;
  date: string;
  time: string;
  passengers: number;
  vehicle: string;
  bookingReference: string;
  details: string;
  ticketUuid: string;
}

interface FetchBookingsPayload {
  surname: string;
  bookingReference: string;
}

interface FetchBookingsResponse {
  futureBookings: Booking[];
  historicBookings: Booking[];
}

interface FetchBookingDetailsPayload {
  userId: string;
  bookingId: string;
}

interface FetchBookingDetailsResponse {
  booking: Booking;
}

interface BookingsState {
  futureBookings: Booking[];
  historicBookings: Booking[];
  booking: Booking | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

export const fetchBookings = createAsyncThunk<
  FetchBookingsResponse,
  FetchBookingsPayload
>("bookings/fetchBookings", async ({ surname, bookingReference }) => {
  const userResponse = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ surname, bookingReference }),
  });
  const { userId } = await userResponse.json();

  const futureResponse = await fetch(
    `${API_URL}/users/${userId}/bookings/future`,
  );
  const futureBookings = await futureResponse.json();

  const historicResponse = await fetch(
    `${API_URL}/users/${userId}/bookings/historic`,
  );
  const historicBookings = await historicResponse.json();

  return { futureBookings, historicBookings };
});

export const fetchBookingDetails = createAsyncThunk<
  FetchBookingDetailsResponse,
  FetchBookingDetailsPayload
>("bookings/fetchBookingDetails", async ({ userId, bookingId }) => {
  const response = await fetch(
    `${API_URL}/users/${userId}/bookings/${bookingId}`,
  );
  const booking = await response.json();
  return { booking };
});

const initialState: BookingsState = {
  futureBookings: [],
  historicBookings: [],
  booking: null,
  loading: false,
  error: null,
  lastFetched: null,
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBookings.fulfilled,
        (state, action: PayloadAction<FetchBookingsResponse>) => {
          state.loading = false;
          state.futureBookings = action.payload.futureBookings;
          state.historicBookings = action.payload.historicBookings;
          state.lastFetched = new Date().getTime();
        },
      )
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch bookings";
      })
      .addCase(fetchBookingDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBookingDetails.fulfilled,
        (state, action: PayloadAction<FetchBookingDetailsResponse>) => {
          state.loading = false;
          state.booking = action.payload.booking;
        },
      )
      .addCase(fetchBookingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch booking details";
      });
  },
});

export const selectBooking = (state: RootState) => state.bookings.booking;
export const selectLoading = (state: RootState) => state.bookings.loading;
export const selectError = (state: RootState) => state.bookings.error;

export default bookingsSlice.reducer;
