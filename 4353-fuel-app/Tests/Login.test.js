import React from "react";
import {
  render,
  fireEvent,
  screen,
  getByLabelText,
  getByRole,
} from "@testing-library/react";
import Login from "../components/Login";
import "@testing-library/jest-dom/extend-expect";

test("renders without crashing", () => {
  const { getByTestId } = render(<Login />);
  const login = getByTestId("login");
  expect(login).toBeInTheDocument();
});

test("should display 'username required' error", () => {
  const { getByTestId, queryByText } = render(<Login />);
  const login = getByTestId("login");
  fireEvent.click(login);
  expect(queryByText("Username is required.")).toBeTruthy();
});
