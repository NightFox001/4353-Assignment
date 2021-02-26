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
                <TextField
                  label = "Gallons"
                  type = "text"
                  margin = "normal"
                />
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
                  selected={ this.state.startDate }
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

export default FuelQuote;