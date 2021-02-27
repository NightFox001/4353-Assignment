import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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
    const [message, setMessage] = useState("")
    const [loadingRegister, setLoadingRegister] = useState(false) // For future use

    
    const handleRegister = async () => {
        const hasUsername = !!username && username.trim().length > 0
        const hasPassword = !!password && password.trim().length > 0
        if (!hasUsername) {
            return setMessage("Username is required.")
        }
        if (!hasPassword) {
            return setMessage("Password is required.")
        }
        return setMessage('Account Created! Please Log In.')
        // if there was an error when we have back end
        // return setMessage(message.response?.data?.message || "There was an issue creating your account.")
    }

    return (
        <div class='text-center'>
            <h1 style={{ color: 'white', fontWeight: 900 }}>Create Account</h1>
            <Paper className={classes.paper}>
                {!!message && <p>{message}</p>}
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
