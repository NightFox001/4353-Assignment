import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { HomeHeader } from '../components/HomeHeader'
import { Login } from '../components/Login'
import { Register } from '../components/Register'


const Home = () => {
    const router = useRouter()
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loadingAccount, setLoadingAccount] = useState(false)



    return (
        <div>
            <HomeHeader/>
            <div class='flex'>
                <Login/>
                <Register/>
            </div>
        </div>
    )
}

export default Home
