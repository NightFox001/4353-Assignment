import { useState } from 'react'
import { useRouter } from "next/router";


export const Header = () => {
    const router = useRouter()
    const [showSearch, setShowSearch] = useState(false)
    const [searchValue, setSearchValue] = useState('')

const handleLogOut = () => {
    router.push('/home')
}

const goToGetQuote = () => {
    router.push('/getQuote')
}

const goToProfile = () => {
    router.push('/profile')
}

const goToQuoteHistory = () => {
    router.push('/quoteHistory')
}

const goToHelp = () => {
    router.push('/profile')
}

  return (
    <>
        <div class='text-white bg-gray-900 bg-opacity-80 w-full overflow-auto'>

        <div class='text-7xl p-6'>Fuel Source</div>
            <div class='flex bg-opacity-70 text-1xl bg-gray-500 overflow-auto'>
                <button class="flex-1 hover:bg-gray-700 p-3 text-xl block w-full" onClick={goToProfile} >Profile</button>
                <button class="flex-1 hover:bg-gray-700 p-3 text-xl block w-full" onClick={goToGetQuote}>Get Quote</button>
                <button class="flex-1 hover:bg-gray-700 p-3 text-xl block w-full" onClick={goToQuoteHistory}>Quote History</button>
                <button class="flex-1 hover:bg-gray-700 p-3 text-xl block w-full" onClick={goToHelp}>Help</button>
                <button class="flex-1 hover:bg-gray-700 p-3 text-xl block w-full" onClick={handleLogOut}>Log out</button>
            </div>
        </div>
    </>
  )
}
