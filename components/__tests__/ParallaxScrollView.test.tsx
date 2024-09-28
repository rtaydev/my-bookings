import React from "react";
import { Text } from "react-native";
import { render, screen } from "@testing-library/react-native";
import ParallaxScrollView from "../ParallaxScrollView";

describe("ParallaxScrollView", () => {
  it("should render children correctly", () => {
    const headerBackgroundColor = {
      light: "#fff",
      dark: "#000",
    };
    const headerImageTest = <Text testID="header-image">Header Image</Text>;

    render(
      <ParallaxScrollView
        headerBackgroundColor={headerBackgroundColor}
        headerImage={headerImageTest}
      >
        <Text testID="child-element">Child Element</Text>
      </ParallaxScrollView>,
    );
    const childElement = screen.getByTestId("child-element");
    const headerImageElement = screen.getByTestId("header-image");
    expect(childElement).toBeTruthy();
    expect(childElement).toHaveTextContent("Child Element");
    expect(headerImageElement).toBeTruthy();
    expect(headerImageElement).toHaveTextContent("Header Image");
  });
});
