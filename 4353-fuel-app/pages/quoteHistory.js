import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Header } from "../components/Header";
import TableV2 from "../components/TableV2";
import axios from "axios";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: "rgba(235,235,255,0.9)",
  },
}));

//   server to request the correct quote history
const QuoteHistory = () => {
  const [error, setError] = useState("Loading quote history...");
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [quoteHistory, setQuoteHistory] = useState("");

  // Get custid from userdata/cookie
  useEffect(async () => {
    // Indicate that quote history is being loaded (to prevent the table from being created with nothing, causing errors)
    setLoadingHistory(true);
    // Retrieve the userToken from local storage
    const token = localStorage.getItem("userToken");
    if (!token) {
      // If no userToken was found, redirect to the home page
      router.push("/home");
    } else {
      // Attempt to load quote history from loadQuoteHistory
      try {
        const response = await axios.get(
          `/api/loadQuoteHistory?token=${token}`
        );

        setQuoteHistory(response.data);
        setError(""); // Reset the error so there is no loading or error message
        setLoadingHistory(false);
      } catch (err) {
        console.log(err);
        return setError(
          err.response?.data?.message ||
            "There was an issue loading quote history"
        );
      }
    }
  }, []);

  // Memoizes the quote history data for the table
  // Changes everytime the status of loadingHistory changes (i.e. it tries to memoize the data again once the quote history is actually loaded)
  const data = React.useMemo(() => quoteHistory, [loadingHistory]);

  return (
    <div className="bg-gray-400 bg-opacity-90 overflow-auto h-screen">
      <Header />
      <div className="m-14 pl-8 bg-gray-100 rounded-md">
        <div className="container mx-auto">
          {
            !!error && (
              <p>{error}</p>
            ) /*If there is an error message (or the data is still loading), this displayes the appropriate message*/
          }

          {!loadingHistory &&
            data.map((
              quote /*Once the data is loaded, the table is created*/
            ) => <TableV2 key={quote.custId} quote={quote} />)}
        </div>
      </div>
    </div>
  );
};

//module.exports = getQuoteHistory

export default QuoteHistory;
