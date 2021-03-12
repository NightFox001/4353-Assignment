import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from '@material-ui/core/styles';
import { Header } from '../components/Header'
import Table from '../components/Table'
import { Quotebox } from '../components/TableV2'
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

    const [error, setError] = useState("Loading quote history...")
    const [loadingHistory, setLoadingHistory] = useState(true)
    const [quoteHistory, setQuoteHistory] = useState("")

    // Get custid from userdata/cookie
    useEffect(async () => {
        // Indicate that quote history is being loaded (to prevent the table from being created with nothing, causing errors)
        setLoadingHistory(true)
        // Retrieve the userId from local storage
        const userId = localStorage.getItem("userId")
        if(!userId) {
            // If no userId was found, redirect to the home page
            router.push('/home')
        } else { // Attempt to load quote history from loadQuoteHistory
            try {
                console.log("Loading quote history...")
                const response = await axios.get(`/api/loadQuoteHistory?id=${userId}`)
                
                setQuoteHistory(response.data)
                console.log("Quote history loaded.")
                setError("") // Reset the error so there is no loading or error message
                setLoadingHistory(false)
            } catch (err) {
                console.log(err)
                return setError(err.response?.data?.message || "There was an issue loading quote history")
            }
        }
    }, [])

    // Defines the column headers and accessors (accessors must match keys in JSON data)
    // This is memoized to prevent redefining unnecessarily
    // I might move column definitions to a separate file to make editing easier in the future
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

    // Memoizes the quote history data for the table
    // Changes everytime the status of loadingHistory changes (i.e. it tries to memoize the data again once the quote history is actually loaded)
    const data = React.useMemo(
        () => quoteHistory, [loadingHistory] )


    return(
        <div className='bg-gray-400 bg-opacity-90 overflow-auto h-screen'>
            <Header />
            <div className='m-14 pl-8 bg-gray-100 rounded-md'>
                <div className='container mx-auto'>
                    {!!error && <p>{error}</p> /*If there is an error message (or the data is still loading), this displayes the appropriate message*/}
                    {!loadingHistory && <Table columns={columns} data={data} /*Once the data is loaded, the table is created*//>}
                    {!loadingHistory && data.map((quote) => (
                        <Quotebox key={quote.custId} quote={quote} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default QuoteHistory