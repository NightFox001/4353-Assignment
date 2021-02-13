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

const Login = () => {
    const classes = useStyles()
    const router = useRouter()
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loadingAccount, setLoadingAccount] = useState(false)

    const goToRegister = () => {
        router.push("/register")
    }

    const handleLogin = async () => {
        const hasEmail = !!email && email.trim().length > 0
        const hasPassword = !!password && password.trim().length > 0
				setError("")
        if (!hasEmail) {
            return setError("Email is required.")
        }
        if (!hasPassword) {
            return setError("Password is required.")
        }
    }

    return (
        <div>
            <h1 style={{ color: 'white', fontWeight: 900 }}>Log In</h1>
            <Paper className={classes.paper}>
                {!!error && <p>{error}</p>}
                <TextField
                    label="Username"
                    type="text"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <Button color="primary" onClick={handleLogin} variant="contained">Log In</Button>
                <br /><br />
                <Button onClick={goToRegister}>Create New Account</Button>
            </Paper>
        </div>
    )
}

export default Login
