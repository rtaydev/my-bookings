import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Collapsible } from "../Collapsible";
import { Text } from "react-native";

describe("Collapsible", () => {
  it("toggles content visibility on click", () => {
    const { getByText, queryByText } = render(
      <Collapsible title="Test Title">
        <Text>Content</Text>
      </Collapsible>,
    );

    const titleElement = getByText("Test Title");
    expect(titleElement).toBeTruthy();

    // Content should not be visible initially
    expect(queryByText("Content")).toBeNull();

    // Simulate press on the title
    fireEvent.press(titleElement);

    // Content should be visible after press
    expect(queryByText("Content")).toBeTruthy();
  });

  it("should toggle collapsible on press", () => {
    const { getByText, queryByText } = render(
      <Collapsible title="Test Title">
        <Text>Toggle Content</Text>
      </Collapsible>,
    );

    const titleElement = getByText("Test Title");

    // Content should not be visible initially
    expect(queryByText("Toggle Content")).toBeNull();

    // Simulate press on the title
    fireEvent.press(titleElement);

    // Content should be visible after first press
    expect(queryByText("Toggle Content")).toBeTruthy();

    // Simulate press again
    fireEvent.press(titleElement);

    // Content should not be visible after second press
    expect(queryByText("Toggle Content")).toBeNull();
  });
});
