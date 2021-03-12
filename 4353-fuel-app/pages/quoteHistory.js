import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from '@material-ui/core/styles';
import { Header } from '../components/Header'
import Table from '../components/Table'
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

import {useState, useEffect} from "react"
import {useAuth} from "../hooks/authentication"
import { useMountedLayoutEffect } from "react-table";
import { Router } from "next/router";

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
    const router = useRouter()
    const [custid, setCustID] = useState("")

    // Get custid from userdata/cookie
    //const user = useAuth();
    useEffect(() => {
        const userString = localStorage.getItem("user")
        console.log(userString)
        if(!userString) {
            router.push('/home')
        } else {
            const user = JSON.parse(userString)
            console.log("user id: " + user.custid)
            setCustID(user.custid)
        }
    }, [])

    const getData = async () => {
        try {
            const response = await axios.get(`/api/quoteHistoryBack?custid=${custid}`);
            const jsonData = await response.json();
            console.log("TESTING!")
            console.log(jsonData)
    
    
            console.log(jsonData)
            return jsonData;
        } catch (err) {
            return MediaStreamError()
        }
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
    const data = React.useMemo(
        () => getData(custid), [] )

    const old_data = React.useMemo(
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
                    {!!custid && <Table columns={columns} data={data} />}
                </div>
            </div>
        </div>
    )
}

export default QuoteHistory