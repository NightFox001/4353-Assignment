import React, { Component, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import { Header } from '../components/Header';
import { useRouter } from "next/router";
import { useState } from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios'

const getQuote = () => {
  //const classes = useStyles()
  const router = useRouter()

  
  const [error, setError] = useState("")
  const [id, setId] = useState(null)
  const [fullName, setFullName] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [gallonsReq, setGallonsReq] = useState('')
  const [date, setDate] = useState('')


  useEffect(async() => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      console.log('not user found in getQuote')
      router.push('/home')
    } else {
      console.log('user found in getQuote')
      const response = await axios.get(`/api/loadProfile?id=${userId}`);
     // const responser = await axios.get(`/api/getquote?id=${userId}`)
      const user = response.data
     // const users = responser.data

      // console.log('made it!' + user)
      const address = String(user.address1 + String(user.address2 ?  ', ' + user.address2 : '') +', '+ user.city +', '+ user.state +', '+ user.zipcode)
      setAddress1(address)
      setGallonsReq(gallonsReq)
      setDate(date)
      setId(id)
    }
  }, [])

  const sendData = async()=>
  {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      console.log('not user found in getQuote')
      router.push('/home')
    } else {
    axios.post('/api/getquote',{
      gallonsReq: gallonsReq,
      date: date,
    })
  }
  console.log(gallonsReq)
  console.log(date)
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
                  <input placeholder="Gallons" type='number' min="100" value = {gallonsReq} onChange={(gallonsReq) => setGallonsReq(gallonsReq.target.value)}></input>
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
                <Button onClick = {sendData} color="rgba(156, 163, 175, 1)" variant="contained" >Get Quote</Button>
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