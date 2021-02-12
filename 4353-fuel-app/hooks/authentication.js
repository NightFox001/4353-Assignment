import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export const useAuth = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userString = localStorage.getItem("user")
    if (!userString) {
      return router.push("/login")
    }
    setUser(JSON.parse(userString))
  }, [])

  return user
}