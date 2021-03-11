import { useAuth } from '../hooks/authentication';

export default function Home() {
  const user = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="bg-gray-400 bg-opacity-90 overflow-auto h-screen" style={{ flexGrow: 1 }}>
      <p className="text-7xl p-7 text-white bg-gray-900 bg-opacity-80 w-full">Fuel Source</p>
    </div>
  )
}
