// app/customer-details.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

const API_URL = "http://localhost:3001";

export default function CustomerDetailsScreen() {
  const { surname, bookingReference } = useLocalSearchParams();
  const [userId, setUserId] = useState('');
  const [bookings, setBookings] = useState([]);
  const [historicBookings, setHistoricBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const userResponse = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ surname, bookingReference }),
      });
      const { userId } = await userResponse.json();

      setUserId(userId)

      console.log(
        "Fetching bookings from:",
        `${API_URL}/users/${userId}/bookings/future`
      );
      const response = await fetch(
        `${API_URL}/users/${userId}/bookings/future`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received bookings:", data);
      setBookings(data);

      const historicResponse = await fetch(
        `${API_URL}/users/${userId}/bookings/historic`
      );
      if (!historicResponse.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const historicData = await historicResponse.json();
      console.log("Received bookings:", historicData);
      setHistoricBookings(historicData);
    } catch (error) {
      console.error("Fetch bookings error:", error);
      setError("Failed to fetch ferry reservations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading ferry reservations...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchBookings}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Ferry Reservations</Text>
      {bookings.length === 0 ? (
        <Text style={styles.noBookingsText}>No ferry reservations found.</Text>
      ) : (
        <FlatList
          data={bookings}
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
                    params: { bookingId: item.id, userId: userId },
                  })
                }
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
