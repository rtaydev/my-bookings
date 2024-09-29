// app/index.js (Login Screen)
import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";

const API_URL = "http://localhost:3001";

export default function LoginScreen() {
  const [surname, setSurname] = useState("");
  const [bookingReference, setBookingReference] = useState("");
  const [errors, setErrors] = useState({ surname: "", bookingReference: "" });

  const validateForm = () => {
    let valid = true;
    let newErrors = { surname: "", bookingReference: "" };

    if (!surname) {
      newErrors.surname = "Surname is required";
      valid = false;
    }
    if (!bookingReference) {
      newErrors.bookingReference = "Booking Reference is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      console.log("Fetching");
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ surname, bookingReference }),
      });
      const data = await response.json();

      if (data.success) {
        router.push({
          pathname: "/customer-details",
          params: { surname, bookingReference },
        });
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Failed to connect to the server");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView>
        <ThemedInput
          placeholder="Surname..."
          value={surname}
          onChangeText={setSurname}
          tabIndex={1}
          required
        />
        {errors.surname ? (
          <ThemedText style={styles.errorText}>{errors.surname}</ThemedText>
        ) : null}
      </ThemedView>
      <ThemedView>
        <ThemedInput
          placeholder="Booking Reference..."
          value={bookingReference}
          onChangeText={setBookingReference}
          tabIndex={2}
          required
        />
        {errors.bookingReference ? (
          <ThemedText style={styles.errorText}>
            {errors.bookingReference}
          </ThemedText>
        ) : null}
      </ThemedView>
      <ThemedButton title="Login" tabIndex={3} onPress={handleLogin} wFull />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    paddingTop: 40,
    gap: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 11,
  },
});
