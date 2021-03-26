import axios from "axios";

const prices = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [id, setId] = useState(null);
  const [gallonsReq, setGallonsReq] = useState("");
  const [date, setDate] = useState("");

  useEffect(async () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      console.log("not user found in getQuote");
      router.push("/home");
    } else {
      console.log("user found in getQuote");
      const response = await axios.get(`/api/getquote?id=${userToken}`);
      const user = response.data;
      setGallonsReq(gallonsReq);
      setDate(date);
      setId(id);
    }
  }, []);
};
export default prices;
