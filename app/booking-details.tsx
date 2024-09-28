import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { format } from "date-fns";
import QRCode from "react-native-qrcode-svg";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBookingDetails,
  selectBooking,
  selectLoading,
  selectError,
} from "@/store/slices/bookingSlice";
import { RootState } from "@/store/store";
import { Booking } from "@/types";

export default function BookingDetailsScreen() {
  const { bookingId, userId } = useLocalSearchParams() as {
    bookingId: string;
    userId: string;
  };
  const dispatch = useDispatch();
  const booking = useSelector((state: RootState) =>
    selectBooking(state),
  ) as Booking | null;
  const loading = useSelector((state: RootState) => selectLoading(state));
  const error = useSelector((state: RootState) => selectError(state));
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchBookingDetails({ userId, bookingId }));
  }, [dispatch, bookingId, userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text testID="error-text">{error}</Text>;
  }

  if (!booking) {
    return (
      <View style={styles.container}>
        <Text>Ferry reservation not found</Text>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  };

  return (
    <ScrollView style={styles.container}>
      <Button testID="back-button" title="Back" onPress={() => router.back()} />
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
      <View style={styles.qrCodeContainer}>
        <QRCode testID="qr-code" value={booking.ticketUuid} size={200} />
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
  qrCodeContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
});
