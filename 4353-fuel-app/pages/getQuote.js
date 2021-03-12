import React, { Component, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import { Header } from '../components/Header';
import { useRouter } from "next/router";
import { useState } from 'react'
import Button from '@material-ui/core/Button';

const getQuote = () => {
  const router = useRouter();
  const [date, setDate] = useState();
  const [address1, setAddres1] = useState('');
  const [address2, setAddres2] = useState('');
  const [custid, setCustID] = useState("");
  const [gallonsReq, setGallonsReq] = useState();


  useEffect(() => {
    const userString = localStorage.getItem("user")
    if (!userString) {
      console.log('not user found in getQuote')
      router.push('/home')
    } else {
      console.log('user found in getQuote')
      const user = JSON.parse(userString)
      // console.log('made it!' + user)
      const address = String(user.address1 + String(user.address2 ?  ', ' + user.address2 : '') +', '+ user.city +', '+ user.state +', '+ user.zipcode)
      setAddres1(address)
      setGallonsReq(gallonsReq)
      setCustID(user.custid)
    }
  }, [])

  const fuelQuote = async () => {
    try {
        const response = await axios.get(`/api/getquote?custid=${custid}`);
        const jsonData = await response.json();
        console.log("TESTING!")
        console.log(jsonData)

        console.log(jsonData)
        return jsonData;
    } catch (error) {
        return (error)
    }
}


  return (
    <>
      <div className='bg-gray-400 bg-opacity-90 overflow-auto h-screen'>
        <Header />
        <div className='m-14 pl-8 bg-gray-100 rounded-md'>
          <form>
            <div>
              <div className= "text-5xl text-black-400 p-6 pt-6">
                  Request Quote
              </div>
              <div>
                  Gallons Requested :
                  <br/>
                  <input placeholder="Gallons" type='number' min="100" defaultValue={gallonsReq}></input>
              </div>
                <br/>
                <div>
                  Delivery Address: 
                  <br/>
                  <textarea id="address1" name="story" rows="2" cols="25" id="title" name="title" defaultValue={address1} readOnly/>
                  <br/>
                </div>
                <br/>
                <div>
                Delivery Date : 
                <br/>
              <DatePicker
                  selected={ date }
                  onChange={ date => setDate(date) }
                  name="startDate"
                  dateFormat="MM/dd/yyyy"
              />
              </div>
              <br/>
              <div>
                Price Per Gallon :
                <br/>
                <textarea readOnly type = 'number' rows = "1" cols = "25" defaultValue="P/G"></textarea>
              </div>
              <br/>
              <div>
                Total Amount : 
                <br/>
                <textarea readOnly rows = "1" cols = "25" defaultValue="Total Cost"></textarea>
                <br/><br/>
                <Button color="rgba(156, 163, 175, 1)" variant="contained" defaultValue="Get Quote"></Button>
                <br/>
                <br/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default getQuote;