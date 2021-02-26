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
          <div class="bg-gradient-to-r from-gray-400 via-gray-400 to-gray-400 ...">
            <div className="fillIns">
                <div class = "text-6xl underline text-black-400">
                    Fuel Quote
                </div>
                <br></br>
                <br></br> 
                <br></br>
            <div class = "text-black-400">
                Gallons Requested :
                <br></br>
                <input placeholder = "Gallons" type = 'number' onKeyPress = "return event.charCode >= 48" min = "1" ></input>
            </div>
                <br></br>
                <div class = "text-black-400">
                    Delivery Address 1 : 
                    <br></br>
                    <textarea id = "address1" name = "story" rows = "1" cols = "25" id = "title" name = "title" readonly = "readonly"><script src = "profile.js">setAddress1</script></textarea>
                    <br></br>
                    Delivery Address 2 : 
                    <br></br>
                    <textarea rows = "1" cols = "25" readonly = "readonly"><script src = "profile.js">setAddress2</script></textarea>
                </div>
                <br></br>
                <div class = "text-black-400">
                Delivery Date : 
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
                Price Per Gallon :
                <br></br>
                <textarea readonly = "readonly" type = 'number' rows = "1" cols = "25">P/G</textarea>
              </div>
              <br></br>
              <div class = "text-black-400">
                Total Amount : 
                <br></br>
                <textarea readonly = "readonly" rows = "1" cols = "25">Total Cost</textarea>
              </div>
            </div>
            </div>
          </form>
      </>
    );
}

export default getQuote;