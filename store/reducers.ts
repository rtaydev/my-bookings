import { combineReducers } from "@reduxjs/toolkit";
import bookingsReducer from "./slices/bookingSlice";
// Import other slices as needed

const rootReducer = combineReducers({
  bookings: bookingsReducer,
  // Add other reducers here
});

export default rootReducer;
