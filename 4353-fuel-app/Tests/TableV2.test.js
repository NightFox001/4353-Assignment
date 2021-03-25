import React from "react";
import TableV2 from "../components/TableV2"
import {
    render
} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { ExpansionPanelActions } from "@material-ui/core";

test("renders quotebox without crashing", () => {
    const quote = {
        userId: 1,
        quote_id: 12,
        delivery_address : "10880 Malibu Point",
        date_requested: "1/11/2021",
        date_delivered: "2/11/2021",
        gallons: 200,
        rate: 2,
        total_price: 2000,
    };
    const { getByTestId } = render(<TableV2 quote={quote}/>);
    const quoteBox = getByTestId("quotebox");
    expect(quoteBox).toBeInTheDocument();
});

test("displays values from quote in quotebox", () => {
    const quote = {
        userId: 1,
        quote_id: 12,
        delivery_address : "10880 Malibu Point",
        date_requested: "1/11/2021",
        date_delivered: "2/11/2021",
        gallons: 201,
        rate: 2,
        total_price: 2000,
    };
    const { getByTestId, queryByText } = render(<TableV2 quote={quote}/>);
    const quoteBox = getByTestId("quotebox");
    expect(queryByText("10880 Malibu Point")).toBeTruthy();
    expect(queryByText("1/11/2021")).toBeTruthy();
    expect(queryByText("2/11/2021")).toBeTruthy();
    expect(queryByText("201")).toBeTruthy();
    expect(queryByText("$2/gal")).toBeTruthy();
    expect(queryByText("$2000")).toBeTruthy();
});