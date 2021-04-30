import React from "react";
import TableV2 from "../components/TableV2";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ExpansionPanelActions } from "@material-ui/core";

let expectedQuote;

beforeEach(() => {
  expectedQuote = {
    userId: 1,
    quote_id: 12,
    delivery_address: "10880 Malibu Point",
    date_requested: "1/11/2021",
    date_delivered: "2/11/2021",
    gallons: 201,
    rate: 2,
    total_price: 2000,
  };
});

test("renders quotebox without crashing", () => {
  const { getByTestId } = render(<TableV2 quote={expectedQuote} />);
  const quoteBox = getByTestId("quotebox");
  expect(quoteBox).toBeInTheDocument();
});
