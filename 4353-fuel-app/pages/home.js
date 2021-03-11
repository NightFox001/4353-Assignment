import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HomeHeader } from '../components/HomeHeader'
import { Login } from '../components/Login'
import { Register } from '../components/Register'


const Home = () => {
    const router = useRouter()
    const [error, setError] = useState("")


    return (
        <div class='bg-gray-400 bg-opacity-90 h-screen'>
            <HomeHeader/>
            <div class='flex m-6 mt-14 space-x-4'>
                <div class='flex-1'>
                    <Login />
                </div>
                <div class='flex-1'>
                    <Register />
                </div>
            </div>
        </div>
    )
}

export default Home
