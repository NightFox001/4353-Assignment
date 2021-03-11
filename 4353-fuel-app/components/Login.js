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

export const Login = () => {
    const classes = useStyles()
    const router = useRouter()
    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loadingAccount, setLoadingAccount] = useState(false)


    const handleLogin = async () => {
        const hasUsername = !!username && username.trim().length > 0
        const hasPassword = !!password && password.trim().length > 0
				setError("")
        if (!hasUsername) {
            return setError("Username is required.")
        }
        if (!hasPassword) {
            return setError("Password is required.")
        }

// This is were the api request is made to /api/login
        setLoadingAccount(true)
        try {
            const response = await axios.get(`/api/login?username=${username}&password=${password}`)
            localStorage.setItem("user", JSON.stringify(response.data))
            // console.log(response.data)
            router.push("/")
        } catch (error) {
            return setError(error.response?.data?.message || "There was an issue logging in.")
        }
        setLoadingAccount(false)
    }

    return (
        <div class='text-center'>
            <h1 style={{ color: 'white', fontWeight: 900 }}>Log In</h1>
            <Paper className={classes.paper}>
                {!!error && <Alert severity="error">{error}</Alert>}
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
                <Button color="rgba(156, 163, 175, 1)" onClick={handleLogin} variant="contained">Log In</Button>
                <br /><br />
                
            </Paper>
        </div>
    )
}

export default Login
