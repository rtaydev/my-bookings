import React from "react";
import renderer from "react-test-renderer";
import { ThemedText } from "../ThemedText";

it("renders correctly", () => {
  const tree = renderer
    .create(<ThemedText>Snapshot test!</ThemedText>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("applies correct styles based on type", () => {
  const tree = renderer
    .create(<ThemedText type="title">Title</ThemedText>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
