import axios from 'axios'

const prices = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [id, setId] = useState(null)
  const [gallonsReq, setGallonsReq] = useState('')
  const [date, setDate] = useState('')

useEffect(async() => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      console.log('not user found in getQuote')
      router.push('/home')
    } else {
      console.log('user found in getQuote')
      const response = await axios.get(`/api/getquote?id=${userId}`);
      const user = response.data
      setGallonsReq(gallonsReq)
      setDate(date)
      setId(id)
    }
  }, [])
}
export default prices;