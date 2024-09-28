import React from "react";
import renderer from "react-test-renderer";
import { TabBarIcon } from "../navigation/TabBarIcon";

it("renders correctly", () => {
  const tree = renderer
    .create(<TabBarIcon name="home" color="#000" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("applies correct icon name and color", () => {
  const tree = renderer
    .create(<TabBarIcon name="home" color="#000" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
