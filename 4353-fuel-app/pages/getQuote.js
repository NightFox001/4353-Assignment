import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import { Header } from '../components/Header';
import React, { useState } from 'react';




  const getQuote = () => {
    const classes = useStyles()
    const router = useRouter()
    const [date, setDate] = useState();
    /*const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loadingAccount, setLoadingAccount] = useState(false)

    const goToRegister = () => {
        router.push("/register")*/
    }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.startDate)
  }


 
  render() {
    return (
      <>
        <Header />
          <form onSubmit={ this.onFormSubmit }>
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
                  onChange={ this.handleChange }
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
  
}

export default getQuote;