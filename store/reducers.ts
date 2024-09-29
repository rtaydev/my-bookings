import { combineReducers } from "@reduxjs/toolkit";
import bookingsReducer from "./slices/bookingSlice";
import searchParamsReducer from "./slices/searchParamsSlice";

const rootReducer = combineReducers({
  bookings: bookingsReducer,
  searchParams: searchParamsReducer,
});

export default rootReducer;
