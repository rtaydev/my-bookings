import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Pressable,
  useColorScheme,
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
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ThemedButton } from "@/components/ThemedButton";

export default function BookingDetailsScreen() {
  const colorScheme = useColorScheme();
  const secondaryBackgroundColor =
    Colors[colorScheme ?? "light"].secondaryBackground;
  const headerColor = Colors[colorScheme ?? "light"].headingTextColor;
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
    return (
      <ThemedView style={styles.container} testID="loading-indicator">
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.errorText} testID="error-message">
          {error}
        </Text>
        <Pressable
          style={styles.retryButton}
          onPress={() => dispatch(fetchBookings({ surname, bookingReference }))}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </ThemedView>
    );
  }

  if (!booking) {
    return (
      <ThemedView style={styles.container}>
        <Text>Ferry reservation not found</Text>
      </ThemedView>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedButton
        variant="text"
        testID="back-button"
        title="Back"
        icon="arrow-back"
        onPress={() => router.back()}
      />
      <ScrollView style={styles.scrollContainer}>
        <Text style={[styles.header, { color: headerColor }]}>
          Ferry Reservation Details
        </Text>
        <View
          style={[
            styles.detailContainer,
            { backgroundColor: secondaryBackgroundColor },
          ]}
        >
          <Text style={styles.label}>Booking Reference:</Text>
          <Text style={styles.value}>{booking.bookingReference}</Text>
          <Text style={styles.label}>Route:</Text>
          <Text style={styles.value}>{booking.title}</Text>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{formatDate(booking.date)}</Text>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{booking.time}</Text>
          <Text style={styles.label}>Passengers:</Text>
          <Text style={styles.value}>{booking.passengers}</Text>
          <Text style={styles.label}>Vehicle:</Text>
          <Text style={styles.value}>{booking.vehicle}</Text>
          <Text style={styles.label}>Additional Info:</Text>
          <Text style={styles.value}>{booking.details}</Text>
        </View>
        <View style={styles.qrCodeContainer}>
          <QRCode testID="qr-code" value={booking.ticketUuid} size={200} />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailContainer: {
    marginBottom: 10,
    borderRadius: 8,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 8,
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
    marginTop: 40,
    marginBottom: 40,
  },
});
