import React, { useEffect, useCallback, useState } from "react";
import {
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
  View,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { clearBookingsCache, fetchBookings } from "@/store/slices/bookingSlice";
import { RootState } from "@/store/store";
import { Booking } from "@/types";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  setSearchParams,
  clearSearchParams,
} from "@/store/slices/searchParamsSlice";

export default function CustomerDetailsScreen() {
  const colorScheme = useColorScheme();
  const secondaryBackgroundColor =
    Colors[colorScheme ?? "light"].secondaryBackground;
  const headerColor = Colors[colorScheme ?? "light"].headingTextColor;
  const iconColor = Colors[colorScheme ?? "light"].icon;
  const errorColor = Colors[colorScheme ?? "light"].error;

  const { surname, bookingReference } = useLocalSearchParams() as {
    surname: string;
    bookingReference: string;
  };
  const dispatch = useDispatch();
  const { futureBookings, historicBookings, loading, error, lastFetched } =
    useSelector((state: RootState) => state.bookings);
  const { surname: storedSurname, bookingReference: storedBookingReference } =
    useSelector((state: RootState) => state.searchParams);

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const hasSearchParamsChanged = () => {
      return (
        storedSurname !== surname || storedBookingReference !== bookingReference
      );
    };

    const fetchData = async () => {
      try {
        if (hasSearchParamsChanged()) {
          dispatch(clearBookingsCache());
          dispatch(clearSearchParams());
          dispatch(setSearchParams({ surname, bookingReference }));
        }

        const isDataValid = () => {
          const now = new Date().getTime();
          const cacheDuration = 1000 * 60 * 5;
          return lastFetched && now - lastFetched < cacheDuration;
        };

        if (
          !isDataValid() &&
          futureBookings.length === 0 &&
          historicBookings.length === 0
        ) {
          await dispatch(fetchBookings({ surname, bookingReference }));
        }
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [
    dispatch,
    surname,
    bookingReference,
    futureBookings,
    historicBookings,
    lastFetched,
    storedSurname,
    storedBookingReference,
  ]);

  const handlePress = useCallback((item: Booking) => {
    router.push({
      pathname: "/booking-details",
      params: { bookingId: item.id, userId: item.userId },
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Booking }) => (
      <Pressable
        style={[styles.item, { backgroundColor: secondaryBackgroundColor }]}
        onPress={() => handlePress(item)}
        testID={`bookings-list-${item.id}`}
      >
        <View>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDetails}>
            {item.date} at {item.time}
          </Text>
          <Text style={styles.itemDetails}>
            {item.passengers} passengers, {item.vehicle}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={iconColor} />
      </Pressable>
    ),
    [handlePress, secondaryBackgroundColor, iconColor],
  );

  const keyExtractor = useCallback((item: Booking) => item.id, []);

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <Text
          style={[styles.errorText, { color: errorColor }]}
          testID="error-message"
        >
          {error}
        </Text>
        <Pressable
          style={[
            styles.retryButton,
            { backgroundColor: Colors.light.buttonBackground },
          ]}
          onPress={() => dispatch(fetchBookings({ surname, bookingReference }))}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </ThemedView>
    );
  }

  if (initialLoading || loading) {
    return (
      <ThemedView
        style={[styles.container, styles.centered]}
        testID="loading-indicator"
      >
        <ActivityIndicator
          size="large"
          color={Colors[colorScheme ?? "light"].text}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Text style={[styles.header, { color: headerColor }]}>
        Your Ferry Reservations
      </Text>
      {futureBookings.length === 0 ? (
        <Text style={styles.noBookingsText}>No ferry reservations found.</Text>
      ) : (
        <FlatList
          data={futureBookings}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          getItemLayout={(data, index) => ({
            length: 80,
            offset: 80 * index,
            index,
          })}
        />
      )}
      {historicBookings.length === 0 ? null : (
        <>
          <Text style={[styles.header, { color: headerColor }]}>
            Your Historic Reservations
          </Text>
          <FlatList
            data={historicBookings}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            getItemLayout={(data, index) => ({
              length: 80,
              offset: 80 * index,
              index,
            })}
          />
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
