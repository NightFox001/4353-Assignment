import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: "rgba(235,235,255,0.9)"
  },
}));

export const Register = () => {
    const classes = useStyles()
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loadingRegister, setLoadingRegister] = useState(false) // For future use

    
    const handleRegister = async () => {
        const hasUsername = !!username && username.trim().length > 0
        const hasPassword = !!password && password.trim().length > 0
        setError("")
        setMessage("")
        if (!hasUsername) {
            return setError("Username is required.")
        }
        if (!hasPassword) {
            return setError("Password is required.")
        }

        try {
            const response = await axios.post(`/api/register?username=${username}&password=${password}`)
            // console.log(response)
        } catch (error) {
            // if there was an error with the request, display the error msg if there is one
            return setError(error.response?.data?.message || "There was an issue creating your account.")
        }
        return setMessage('Account Created! Please Log In.')
    }

    return (
        <div class='text-center'>
            <h1 style={{ color: 'white', fontWeight: 900 }}>Create Account</h1>
            <Paper className={classes.paper}>
                {!!error && <Alert severity="error">{error}</Alert>}
                {!!message && <Alert severity="success">{message}</Alert>}
                <TextField
                    label="Username"
                    type="text"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br /><br />
                <TextField
                    label="Password"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br /><br />
                <Button color="" onClick={handleRegister} variant="contained">Register</Button>
                <br /><br />
            </Paper>
        </div>
    )
}

export default Register
