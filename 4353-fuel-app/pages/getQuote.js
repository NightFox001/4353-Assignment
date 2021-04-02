import React, { Component, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "../components/Header";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";

const getQuote = () => {
  //const classes = useStyles()
  const router = useRouter();

  const [error, setError] = useState("");
  const [saveQuoteError, setSaveQuoteError] = useState("");
  const [id, setId] = useState(null);
  const [fullName, setFullName] = useState("");
  const [fullAddress, setFullAddress] = useState("12343, werdf, dfs");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [cityStateZip, setCityStateZip] = useState("");
  const [gallons, setGallons] = useState(null);
  const [gallonsQuoted, setGallonsQuoted] = useState();
  const [date, setDate] = useState("");
  const [pricePG, setPricePG] = useState(3.5);
  const [total, setTotal] = useState(null);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [showQuote, setShowQuote] = useState(false);

  useEffect(async () => {
    setError("");
    // login api returns id for user to Login component, Login component saves id to local storage as "userToken"
    const token = localStorage.getItem("userToken");
    if (!token) {
      router.push("/home");
    } else {
      // get profile info from loadprofile
      try {
        const response = await axios.get(`/api/loadProfile?token=${token}`);
        console.log("profile recieved:");
        console.log(response.data);

        setId(response.data?.id);
        setFullName(response.data?.fullName);
        setAddress1(response.data?.address1);
        setAddress2(response.data?.address2);
        setCity(response.data?.city);
        setState(response.data?.state);
        setZipcode(response.data?.zipcode);
        setCityStateZip(
          String(
            response.data?.city +
              ", " +
              response.data?.state +
              ", " +
              response.data?.zipcode
          )
        );
      } catch (error) {
        return setError(
          error.response?.data?.message ||
            error?.message ||
            "There was an issue loading address info"
        );
      }
    }
  }, []);

  const handleGetQuote = async () => {
    setShowQuote(false);
    setError("");
    const token = localStorage.getItem("userToken");
    if (!token) {
      router.push("/home");
    } else {
      if (!gallons) return setError("Must request at least 1 gallon.");
      if (!date) return setError("Date must be selected.");

      try {
        console.log("getting quote...");

        const response = await axios.get(
          `/api/requestQuote?token=${token}&gallons=${gallons}&date=${date}&state=${state}`
        );
        console.log("quote requested!");
        console.log("gallons: " + response.data?.gallonsQuoted);

        setGallonsQuoted(Number(response.data?.gallonsQuoted));
        setPricePG(Number(response.data?.pricePG));
        setTotal(Number(response.data?.pricePG * gallons));

        setShowQuote(true);
      } catch (error) {
        console.log(error);
        return setError(
          error.response?.data?.message ||
            "There was an issue requesting your quote."
        );
      }
    }
  };
  var r = 3.5;
  return (
    <div className="bg-gray-400 bg-opacity-90 overflow-auto h-screen ">
      <Header />
      <div className="flex">
        <div className="w-1/2">
          <form>
            <div className="m-14 p-8 bg-gray-100 rounded-md">
              <div className="text-5xl text-black-400">Request Quote</div>

              {!!error && (
                <Alert className="mt-6" severity="error">
                  {error}
                </Alert>
              )}

              <div className="flex flex-wrap mt-8 justify-evenly items-center content-center">
                <div className="">
                  <TextField
                    label="Gallons"
                    type="number"
                    InputProps={{
                      inputProps: {
                        max: 1000,
                        min: 1,
                      },
                    }}
                    margin="none"
                    value={gallons}
                    onChange={(gallons) => setGallons(gallons.target.value)}
                  />
                </div>
                <div className="">
                  Delivery Date :
                  <br />
                  <DatePicker
                    className="border-2 rounded-lg bg-gray-200 border-gray-300 hover:border-gray-400 text-center"
                    selected={date}
                    onChange={(date) => setDate(date)}
                    name="startDate"
                    dateFormat="MM/dd/yyyy"
                  />
                </div>
              </div>

              {/* display address if loaded */}
              <div className="flex mt-10 justify-evenly">
                <div className="font-medium text-lg">Delivery Address:</div>
                <div className="">
                  {!!fullName && <div>{fullName}</div>}
                  {!!address1 && <div>{address1}</div>}
                  {!!address2 && <div>{address2}</div>}
                  {!!cityStateZip && <div>{cityStateZip}</div>}
                </div>
              </div>
              <div className="text-center mt-10">
                <Button onClick={handleGetQuote} variant="contained">
                  Get Quote
                </Button>
              </div>
            </div>
          </form>
        </div>

        {showQuote && (
          <div className="w-1/2">
            <form>
              <div className="m-14 p-8 bg-gray-100 rounded-md">
                <div className="text-5xl text-black-400">Save Quote</div>

                {!!saveQuoteError && (
                  <Alert className="mt-8" severity="error">
                    {saveQuoteError}
                  </Alert>
                )}
                <div className="mt-8 flex flex-row justify-evenly">
                  <div className="font-medium text-lg">Gallons:</div>
                  {(!!gallonsQuoted && <div>{gallonsQuoted}</div>) || (
                    <div>Loading...</div>
                  )}
                </div>
                <div className="mt-4 flex flex-row justify-evenly">
                  <div>
                    <div className="font-medium text-lg">Price:</div>
                    <div className="text-xs text-gray-400">(per gallon)</div>
                  </div>
                  {(!!pricePG && <div>${pricePG}.00</div>) || (
                    <div>Loading...</div>
                  )}
                </div>

                <div className="mt-4 flex flex-row justify-evenly">
                  <div className="font-medium text-lg">Total:</div>
                  {(!!total && <div>${total}.00</div>) || <div>Loading...</div>}
                </div>
                <div className="text-center mt-10">
                  <Button onClick={handleGetQuote} variant="contained">
                    Save Quote
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default getQuote;
