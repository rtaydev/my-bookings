import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3001/api";

interface Booking {
  // Define the structure of a booking object here
}

interface FetchBookingsPayload {
  surname: string;
  bookingReference: string;
}

interface FetchBookingsResponse {
  futureBookings: Booking[];
  historicBookings: Booking[];
}

interface BookingsState {
  futureBookings: Booking[];
  historicBookings: Booking[];
  loading: boolean;
  error: string | null;
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

const initialState: BookingsState = {
  futureBookings: [],
  historicBookings: [],
  loading: false,
  error: null,
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
        },
      )
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch bookings";
      });
  },
});

export default bookingsSlice.reducer;
