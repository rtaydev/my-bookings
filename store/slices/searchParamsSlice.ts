import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SearchParamsState {
  surname: string | null;
  bookingReference: string | null;
}

const initialState: SearchParamsState = {
  surname: null,
  bookingReference: null,
};

const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState,
  reducers: {
    setSearchParams: (
      state,
      action: PayloadAction<{ surname: string; bookingReference: string }>,
    ) => {
      state.surname = action.payload.surname;
      state.bookingReference = action.payload.bookingReference;
    },
    clearSearchParams: (state) => {
      state.surname = null;
      state.bookingReference = null;
    },
  },
});

const persistConfig = {
  key: "searchParams",
  storage: AsyncStorage,
};

export const { setSearchParams, clearSearchParams } = searchParamsSlice.actions;
export default persistReducer(persistConfig, searchParamsSlice.reducer);
