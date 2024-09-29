import React from "react";
import { TextInput, type TextInputProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  testID?: string;
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  testID,
  ...rest
}: ThemedInputProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "border",
  );

  return (
    <TextInput
      style={[{ backgroundColor, color, borderColor }, styles.input, style]}
      testID={testID}
      placeholderTextColor="#888"
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 0.5,
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
});
