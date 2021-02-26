import { useState } from 'react'
import { useRouter } from "next/router";


export const Header = () => {
    const router = useRouter()
    const [showSearch, setShowSearch] = useState(false)
    const [searchValue, setSearchValue] = useState('')

const handleLogOut = () => {
    router.push('/login')
}

const goToGetQuote = () => {
    router.push('/getQuote')
}

const goToProfile = () => {
    router.push('/profile')
}

const goToHelp = () => {
    router.push('/profile')
}

  return (
    <>
        <div class='bg-gray-400 bg-opacity-80 w-full pt-6 pb-1' >

            <div class='text-7xl'>Company Name</div>
            <div class='m-8 p-1.5 flex bg-opacity-70 text-1xl bg-gray-500 rounded-lg '>
                <button class="flex-1 m-2 bg-gray-300 hover:bg-gray-400 rounded-md h-8" onClick={goToProfile}>Profile</button>
                <button class="flex-1 m-2 bg-gray-300 hover:bg-gray-400 rounded-md h-8" onClick={goToGetQuote}>Get Quote</button>
                <button class="flex-1 m-2 bg-gray-300 hover:bg-gray-400 rounded-md h-8" onClick={goToHelp}>Help</button>
                <button class="flex-1 m-2 bg-gray-300 hover:bg-gray-400 rounded-md h-8" onClick={handleLogOut}>Log out</button>
            </div>
        </div>
    </>
  )
}
