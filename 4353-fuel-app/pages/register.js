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

const Register = () => {
    const classes = useStyles()
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loadingRegister, setLoadingRegister] = useState(false) // For future use

    
    const handleRegister = async () => {
        const hasUsername = !!username && username.trim().length > 0
        const hasPassword = !!password && password.trim().length > 0
        if (!hasUsername) {
            return setError("Username is required.")
        }
        if (!hasPassword) {
            return setError("Password is required.")
        }
        router.push("/")
        return setError(error.response?.data?.message || "There was an issue creating your account.")
    }

    return (
        <div>
            <h1 style={{ color: 'white', fontWeight: 900 }}>Create Account</h1>
            <Paper className={classes.paper}>
                {!!error && <p>{error}</p>}
                <TextField
                    label="Username"
                    type="username"
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
                <Button color="primary" onClick={handleRegister} variant="contained">Register</Button>
            </Paper>
        </div>
    )
}

export default Register
