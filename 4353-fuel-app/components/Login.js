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

export const Login = () => {
    const classes = useStyles()
    const router = useRouter()
    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loadingAccount, setLoadingAccount] = useState(false)


    const handleLogin = async () => {
        const hasEmail = !!username && username.trim().length > 0
        const hasPassword = !!password && password.trim().length > 0
				setError("")
        if (!hasEmail) {
            return setError("Email is required.")
        }
        if (!hasPassword) {
            return setError("Password is required.")
        }
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify({username: username}))
        const tempstring = localStorage.getItem('user')
        const temp = JSON.parse(tempstring)
        console.log(temp.username)
        
        router.push("/profile")
    }

    return (
        <div class='text-center'>
            <h1 style={{ color: 'white', fontWeight: 900 }}>Log In</h1>
            <Paper className={classes.paper}>
                {!!error && <p>{error}</p>}
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
