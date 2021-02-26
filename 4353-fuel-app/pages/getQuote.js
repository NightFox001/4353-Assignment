import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import { Header } from '../components/Header';
import { useRouter } from "next/router";
import { useState } from 'react'


  const getQuote = () => {
    const [date, setDate] = useState();
    
    return (
      <>
        <Header />
          <form>
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
                  selected={ date }
                  onChange={ date => setDate(date) }
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