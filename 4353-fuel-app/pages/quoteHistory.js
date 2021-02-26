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

const QuoteHistory = () => {
    const classes = useStyles()
    
    // Requests the quote history from the server, which queries the DB for the data
    // For now, this will parse and return a placeholder json file to simulate data received from the server
    // Async not only allows the json data here to be parsed before the table is rendered, but will also allow
    //    time for the server to retrieve the necessary data
    const getQuoteHistory = async () => {
        jsonfile = "../testHistory.json"
        jsondata = await JSON.parse(jsonfile)

        return jsondata
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
        () => getQuoteHistory()
    )

    const tableInstance = useTable({columns, data})

    return(
        <div>
            <Header />
            <div class='bg-gray-449 bg-opacity-95 h-screen'>
                <Table columns={columns} data={data} />
            </div>
        </div>
    )
}

export default QuoteHistory