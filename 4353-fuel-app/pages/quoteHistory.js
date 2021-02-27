import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from '../components/Header'
import Table from '../components/Table'
import { Tab } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: "rgba(235,235,255,0.9)"
  },
}));

// When we have implemented a user being logged in, it will check that a user IS logged in
//   before attempting to contact the server to get the quote history.
// Also, when the user is logged in, relevant identifying information will be sent to the 
//   server to request the correct quote history
const QuoteHistory = () => {
    const classes = useStyles()
    
    // Requests the quote history from the server, which queries the DB for the data
    // For now, this will parse and return a placeholder json file to simulate data received from the server
    // Async not only allows the json data here to be parsed before the table is rendered, but will also allow
    //    time for the server to retrieve the necessary data
    const getQuoteHistory = async () => {
       /* const unparsed = `{"quotes": [
            {
                "quote_id": "1",
                "delivery_address" : "address!",
                "date_requested": "date 1!",
                "date_delivered": "date 2!",
                "gallons": "gals!",
                "rate": "too much!",
                "total_price": "really high!"
            },
            {
                "quote_id": "2",
                "delivery_address" : "address??",
                "date_requested": "date 3!",
                "date_delivered": "date 4!",
                "gallons": "gals??",
                "rate": "too much??",
                "total_price": "really high??"
            },
            {
                "quote_id": "3",
                "delivery_address" : "address two electric boogaloo",
                "date_requested": "date 5!",
                "date_delivered": "date 6!",
                "gallons": "gals! gals! gals!",
                "rate": "too much! or not enough?",
                "total_price": "really high! or way to cheap?"
            },
            {
                "quote_id": "4",
                "delivery_address" : "address the 4th, awakening",
                "date_requested": "date 7!",
                "date_delivered": "date 8!",
                "gallons": "gals! AND guys!",
                "rate": "way to low!",
                "total_price": "reasonable despite the rate!"
            }
        ]
    }`
      try {
          console.log("parsing pls")
          var parsed = await JSON.parse(unparsed)
          console.log("hopefully parsed")
          var jdata = parsed.quotes
          jdata.forEach(function(element){
            console.log(element);
        });

        return jdata
      } catch (error) {
        console.error(error)
      }*/
    }

    // Defines the column headers and accessors (accessors must match keys in JSON data)
    // This is memoized to prevent redefining unnecessarily
    // I might move column definitions to a separate file to make editing easier
    const columns = React.useMemo(
        () => [
            {
                Header: 'Delivery Address',
                accessor: 'delivery_address'
            },
            {
                Header: 'Date Requested',
                accessor: 'date_requested'
            },
            {
                Header: 'Date Delivered',
                accessor: 'date_delivered'
            },
            {
                Header: 'Gallons',
                accessor: 'gallons'
            },
            {
                Header: 'Rate ($/gal)',
                accessor: 'rate'
            },
            {
                Header: 'Total Price',
                accessor: 'total_price'
            }
        ],
        []
    )

    // Defines the data to be displayed in the table
    // Memoized to prevent reaccessing data unnecessarily
    /*const data = React.useMemo(
        () => [
            getQuoteHistory()
        ],
        []
    )*/

    const data = React.useMemo(
        () => [
            {
                quote_id: "1",
                delivery_address : "address!",
                date_requested: "date 1!",
                date_delivered: "date 2!",
                gallons: "gals!",
                rate: "too much!",
                total_price: "really high!"
            },
            {
                quote_id: "2",
                delivery_address : "address??",
                date_requested: "date 3!",
                date_delivered: "date 4!",
                gallons: "gals??",
                rate: "too much??",
                total_price: "really high??"
            },
            {
                quote_id: "3",
                delivery_address : "address two electric boogaloo",
                date_requested: "date 5!",
                date_delivered: "date 6!",
                gallons: "gals! gals! gals!",
                rate: "too much! or not enough?",
                total_price: "really high! or way to cheap?"
            },
            {
                quote_id: "4",
                delivery_address : "address the 4th, awakening",
                date_requested: "date 7!",
                date_delivered: "date 8!",
                gallons: "gals! AND guys!",
                rate: "way to low!",
                total_price: "reasonable despite the rate!"
            }
        ],
        []
    )

    return(
        <div class='bg-gray-400 bg-opacity-90 overflow-auto h-screen'>
            <Header />
            <div class='m-14 pl-8 bg-gray-100 rounded-md'>
                <div class='container mx-auto'>
                    <Table columns={columns} data={data} />
                </div>
            </div>
        </div>
    )
}

export default QuoteHistory