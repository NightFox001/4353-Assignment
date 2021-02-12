import { useAuth } from '../hooks/authentication';

export default function Home() {
  const user = useAuth()

  if (!user) {
    return null
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <p>You shouldn't see this... </p>
    </div>
  )
}
