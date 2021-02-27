import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import { Header } from '../components/Header';


class FuelQuote extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
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
      <div class='bg-gray-400 bg-opacity-90 overflow-auto h-screen'>
        <Header />
          <form onSubmit={ this.onFormSubmit }>
            <div >
                <h1>
                    Fuel Quote
                </h1>
                <br></br>
                <br></br>
                <br></br>
            <h3>
                Gallons Requested
                <TextField
                label="number"
                type="text"
                margin="normal"
                />
            </h3>
                <br></br>
                <h3>
                    Delivery Address
                </h3>
                <br></br>
                <h4>
                Delivery Date
                <br></br>
              <DatePicker
                  selected={ this.state.startDate }
                  onChange={ this.handleChange }
                  name="startDate"
                  dateFormat="MM/dd/yyyy"
              />
              </h4>
            </div>
          </form>
          </div>
      </>
    );
  }
  
}

export default FuelQuote;