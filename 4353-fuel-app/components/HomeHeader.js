import { useState } from 'react'
import { useRouter } from "next/router";


export const HomeHeader = () => {
    const router = useRouter()
    const [showSearch, setShowSearch] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const goToHome = () => {
        // router.push('/')
    }
    const handlePlanning = () => {
        router.push('/login')
    }
    const goToDiagrams = () => {
        // router.push('/')
    }
    const goToAbout = () => {
        // router.push('/')
    }
    const goToReadMe = () => {
        // router.push('/')
    }

  return (
    <>
        <div class='bg-gray-900 bg-opacity-80 w-full pt-6 pb-1' >
            <div class='text-7xl text-white pl-6'>Fuel Source</div>
            <div class='m-8 p-1.5 flex bg-opacity-70 text-1xl bg-gray-500 rounded-lg '>
                <button 
                    class="flex-1 m-2 bg-gray-300 hover:bg-gray-400 rounded-md h-8" 
                    onClick={goToHome}>
                        Home
                </button>
                <button 
                    class="flex-1 m-2 bg-gray-300 hover:bg-gray-400 rounded-md h-8" 
                    onClick={goToAbout}>
                        About
                </button>
                <button 
                    class="flex-1 m-2 bg-gray-300 hover:bg-gray-400 rounded-md h-8" 
                    onClick={handlePlanning}>
                        Planning
                </button>
                <button 
                    class="flex-1 m-2 bg-gray-300 hover:bg-gray-400 rounded-md h-8" 
                    onClick={goToDiagrams}>
                        Diagrams
                </button>
                <button 
                    class="flex-1 m-2 bg-gray-300 hover:bg-gray-400 rounded-md h-8" 
                    onClick={goToReadMe}>
                        ReadMe
                </button>
            </div>
        </div>
    </>
  )
}
