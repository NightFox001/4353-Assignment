import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export const useAuth = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userString = localStorage.getItem("userId")
    if (!userString) {
      return router.push("/home")
    }
    setUser(JSON.parse(userString))
    return router.push("/profile")
    }, [])

  return user
}