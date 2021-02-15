import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export const useAuth = () => {
  const router = useRouter()
  return router.push("/login")
}