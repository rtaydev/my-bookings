// app/booking-details.js
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { format } from "date-fns";

const API_URL = "http://localhost:3001";

export default function BookingDetailsScreen() {
  const { bookingId, userId } = useLocalSearchParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId, fetchBookingDetails]);

  const fetchBookingDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${API_URL}/users/${userId}/bookings/${bookingId}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBooking(data);
    } catch (error) {
      console.error("Fetch booking details error:", error);
      setError(
        "Failed to fetch ferry reservation details. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  }, [bookingId, userId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading ferry reservation details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!booking) {
    return (
      <View style={styles.container}>
        <Text>Ferry reservation not found</Text>
      </View>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Ferry Reservation Details</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Booking Reference:</Text>
        <Text style={styles.value}>{booking.bookingReference}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Route:</Text>
        <Text style={styles.value}>{booking.title}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{formatDate(booking.date)}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{booking.time}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Passengers:</Text>
        <Text style={styles.value}>{booking.passengers}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Vehicle:</Text>
        <Text style={styles.value}>{booking.vehicle}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Additional Info:</Text>
        <Text style={styles.value}>{booking.details}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  detailContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
