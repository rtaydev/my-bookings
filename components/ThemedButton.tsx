import React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  Linking,
  Platform,
  View,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface ThemedButtonProps {
  title?: string;
  lightColor?: string;
  darkColor?: string;
  style?: object;
  onPress?: () => void;
  testID?: string;
  href?: string;
  icon?: string;
  wFull?: boolean;
  variant?: "default" | "outline" | "text";
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  lightColor,
  darkColor,
  style,
  onPress,
  testID,
  href,
  icon,
  wFull = false,
  variant = "default",
}) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "buttonBackground",
  );

  const handlePress = () => {
    if (href && Platform.OS === "web") {
      Linking.openURL(href);
    } else if (onPress) {
      onPress();
    }
  };

  const colorScheme = useColorScheme();
  const textColor =
    variant === "default"
      ? Colors[colorScheme ?? "light"].buttonText
      : backgroundColor;

  const getVariantStyles = () => {
    switch (variant) {
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: backgroundColor,
        };
      case "text":
        return {
          backgroundColor: "transparent",
        };
      default:
        return {
          backgroundColor,
        };
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        getVariantStyles(),
        { opacity: pressed ? 0.8 : 1 },
        style,
        !title && icon && styles.iconOnlyButton,
        wFull ? styles.fullWidthButton : styles.autoWidthButton, // Adjust width based on wFull
      ]}
      testID={testID}
      accessibilityRole="button"
    >
      <View style={styles.content}>
        {icon && (
          <Ionicons
            name={icon}
            style={[styles.icon, { color: textColor }]}
            size={16}
          />
        )}
        {title && (
          <Text
            style={[
              styles.buttonText,
              { color: textColor },
              icon && { marginLeft: 8 },
            ]}
          >
            {title}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconOnlyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  fullWidthButton: {
    width: "100%",
  },
  autoWidthButton: {
    alignSelf: "flex-start",
  },
});
