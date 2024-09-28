import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "@/store/slices/bookingSlice";

export default function CustomerDetailsScreen() {
  const { surname, bookingReference } = useLocalSearchParams();
  const dispatch = useDispatch();
  const { futureBookings, historicBookings, loading, error } = useSelector(
    (state) => state.bookings,
  );

  useEffect(() => {
    dispatch(fetchBookings({ surname, bookingReference }));
  }, [dispatch, surname, bookingReference]);

  if (loading) {
    return (
      <View style={styles.container} testID="loading-indicator">
        <Text>Loading ferry reservations...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText} testID="error-message">
          {error}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => dispatch(fetchBookings({ surname, bookingReference }))}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Ferry Reservations</Text>
      {futureBookings.length === 0 ? (
        <Text style={styles.noBookingsText}>No ferry reservations found.</Text>
      ) : (
        <FlatList
          data={futureBookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                router.push({
                  pathname: "/booking-details",
                  params: { bookingId: item.id },
                })
              }
              testID={`future-booking-${item.id}`}
            >
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDetails}>
                {item.date} at {item.time}
              </Text>
              <Text style={styles.itemDetails}>
                {item.passengers} passengers, {item.vehicle}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      {historicBookings.length === 0 ? null : (
        <>
          <Text style={styles.header}>Your Historic Reservations</Text>
          <FlatList
            data={historicBookings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() =>
                  router.push({
                    pathname: "/booking-details",
                    params: { bookingId: item.id, userId: item.userId },
                  })
                }
                testID={`historic-booking-${item.id}`}
              >
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDetails}>
                  {item.date} at {item.time}
                </Text>
                <Text style={styles.itemDetails}>
                  {item.passengers} passengers, {item.vehicle}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDetails: {
    fontSize: 14,
    color: "#666",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
  },
  noBookingsText: {
    fontSize: 16,
    fontStyle: "italic",
  },
});
