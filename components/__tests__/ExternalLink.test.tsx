import React from "react";
import { render } from "@testing-library/react-native";
import { ExternalLink } from "../ExternalLink";

it("renders correctly", () => {
  const tree = render(
    <ExternalLink href="https://example.com">Link</ExternalLink>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it("has correct props", () => {
  const { getByText } = render(
    <ExternalLink href="https://example.com">Link</ExternalLink>,
  );
  const linkElement = getByText("Link");
  expect(linkElement.props.href).toBe("https://example.com");
});
