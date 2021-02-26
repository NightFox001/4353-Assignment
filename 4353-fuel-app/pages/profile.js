import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from '../components/Header'
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: "red",
    background: "rgba(235,235,255,0.9)"
  },
}));

const Login = () => {
    const classes = useStyles()
    const router = useRouter()
    const [error, setError] = useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [loadingAccount, setLoadingAccount] = useState(false)


    return (
        <div>
            <Header />
            <div class='bg-gray-700 bg-opacity-95 text-white'>
    {/* be on Profile page / form:
	- Full Name (50 characters, required)
	- Address 1 (100 characters, required)
	- Address 2 (100 characters, optional)
	- City (100 characters, required)
	- State (Drop Down, selection required) DB will store 2 character state code
- Zipcode (9 characters, at least 5 character code required) */}
            <form className={classes.root}>
                <TextField 
                    label="Full Name"
                    type="text"
                    margin="normal"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <br /><br />
                <TextField
                    label="Address 1"
                    type="text"
                    margin="normal"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    required
                />
                <br /><br />
                <TextField
                    label="Address 2"
                    type="text"
                    margin="normal"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    
                />
                <br /><br />
                <TextField
                    label="City"
                    type="text"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
            </form>
            </div>
        </div>

    )
}

export default Login
