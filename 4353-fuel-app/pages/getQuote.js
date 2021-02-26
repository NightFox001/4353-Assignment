import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import { Header } from '../components/Header';
import { useRouter } from "next/router";
import { useState } from 'react'



  export const getQuote = () => {
    const router = useRouter()
    const [startDate, setStartDate] = useState(null);
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loadingAccount, setLoadingAccount] = useState(false)

    const handleSubmit = () => {
      alert('date set')
    }
    return (
      <>
        <Header />
          <form onSubmit={ handleSubmit }>
            <div className="fillIns">
                <div class = "text-6xl underline">
                    Fuel Quote
                </div>
                <br></br>
                <br></br>
                <br></br>
            <div>
                Gallons Requested:
                <input class = "bg-gray-200 focus:bg-white..."></input>
            </div>
                <br></br>
                <div>
                    Delivery Address:
                    <textarea readonly = "readonly">32</textarea>
                </div>
                <br></br>
                <div>
                Delivery Date:
                <br></br>
              <DatePicker
                  selected={ startDate }
                  onChange={ startDate  => setStartDate(startDate) }
                  name="startDate"
                  dateFormat="MM/dd/yyyy"
              />
              </div>
              <br></br>
              <div>
                Total Amount:
                <textarea readonly = "readonly">Total Cost</textarea>
              </div>
            </div>
          </form>
      </>
    );
}

export default getQuote;