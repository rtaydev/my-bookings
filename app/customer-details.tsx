import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store"; // Adjust this import path as needed
import { fetchBookings } from "../store/slices/bookingSlice"; // Adjust this import path as needed
import { useLocalSearchParams } from "expo-router";

const CustomerDetailsScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, futureBookings, historicBookings } = useSelector(
    (state: RootState) => state.bookings,
  );
  const { surname, bookingReference } = useLocalSearchParams();

  useEffect(() => {
    dispatch(fetchBookings({ surname, bookingReference }));
  }, [dispatch, surname, bookingReference]);

  if (loading) {
    return (
      <ActivityIndicator
        testID="loading-indicator"
        size="large"
        color="#0000ff"
      />
    );
  }

  if (error) {
    return <Text testID="error-message">Error: {error}</Text>;
  }

  return (
    <View>
      <Text>Future Bookings:</Text>
      {futureBookings.map((booking) => (
        <Text key={booking.id} testID={`future-booking-${booking.id}`}>
          {booking.title}
        </Text>
      ))}
      <Text>Historic Bookings:</Text>
      {historicBookings.map((booking) => (
        <Text key={booking.id} testID={`historic-booking-${booking.id}`}>
          {booking.title}
        </Text>
      ))}
    </View>
  );
};

export default CustomerDetailsScreen;
