import { useState } from 'react'
import { useRouter } from "next/router";


export const Header = () => {
    const router = useRouter()
    const [showSearch, setShowSearch] = useState(false)
    const [searchValue, setSearchValue] = useState('')

const handleLogOut = () => {
    router.push('/')
}

const goToGetQuote = () => {
    router.push('/FuelQuote')
}

  return (
    <>

        <div class='text-7xl'>Company Name</div>
        <div class='m-8 flex  text-1xl bg-gray-500 '>
            <button class="flex-1 bg-gray-300 hover:bg-gray-500">Profile</button>
            <button class="flex-1 bg-gray-300 hover:bg-gray-500" onClick={goToGetQuote}>Get Quote</button>
            <button class="flex-1 bg-gray-300 hover:bg-gray-500">Help</button>
            <button class="flex-1 bg-gray-300 hover:bg-gray-500" onClick={handleLogOut}>Log out</button>
        </div>
    </>
  )
}
