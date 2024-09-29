import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemedButton } from "../ThemedButton";
import { Colors } from "@/constants/Colors";

describe("ThemedButton", () => {
  it("renders correctly with theme", () => {
    const { getByTestId, toJSON } = render(
      <ThemedButton
        title="Test Button"
        darkColor="#1E88E5"
        testID="themed-button"
      />,
    );

    const button = getByTestId("themed-button");
    const flattenedStyle = button.props.style
      .flat()
      .reduce((acc, style) => ({ ...acc, ...style }), {});

    expect(flattenedStyle).toEqual(
      expect.objectContaining({
        backgroundColor: Colors.light.buttonBackground,
      }),
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("applies custom styles", () => {
    const { getByTestId, toJSON } = render(
      <ThemedButton
        title="Test Button"
        style={{ padding: 20 }}
        testID="themed-button"
      />,
    );

    const button = getByTestId("themed-button");
    const flattenedStyle = button.props.style
      .flat()
      .reduce((acc, style) => ({ ...acc, ...style }), {});

    expect(flattenedStyle).toEqual(expect.objectContaining({ padding: 20 }));
    expect(toJSON()).toMatchSnapshot();
  });

  it("passes other props to Pressable", () => {
    const onPressMock = jest.fn();
    const { getByTestId, toJSON } = render(
      <ThemedButton
        title="Test Button"
        onPress={onPressMock}
        testID="themed-button"
      />,
    );

    const button = getByTestId("themed-button");
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
    expect(toJSON()).toMatchSnapshot();
  });

  it("matches the snapshot", () => {
    const { toJSON } = render(
      <ThemedButton
        title="Snapshot Button"
        darkColor="#1E88E5"
        testID="snapshot-button"
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
