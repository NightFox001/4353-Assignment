import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Header } from "../components/Header";
import Select from "@material-ui/core/Select";
import { InputLabel, FormControl } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    color: "rgba(156, 163, 175, 1)",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const router = useRouter();

  const [error, setError] = useState("");
  const [id, setId] = useState(null);
  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [editing, setEditing] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(async () => {
    setError("");
    // login api returns id for user to Login component, Login component saves id to local storage as "userToken"
    const token = localStorage.getItem("userToken");
    console.log(token);
    if (!token) {
      router.push("/home");
    } else {
      // get profile info from loadprofile
      try {
        const response = await axios.get(`/api/loadProfile?token=${token}`);
        console.log("profile recieved:");
        console.log(response.data);

        setId(response.data.id);
        setFullName(response.data.fullName);
        setAddress1(response.data.address1);
        setAddress2(response.data.address2);
        setCity(response.data.city);
        setState(response.data.state);
        setZipcode(response.data.zipcode);
      } catch (error) {
        return setError(
          error.response?.data?.message ||
            error ||
            "There was an issue loading profile"
        );
      }
    }
  }, []);

  const handleEdit = () => {
    setEditing(true);
    setDisabled(false);
  };

  const handleSave = async () => {
    setError("");
    const token = localStorage.getItem("userToken");
    const hasId = !!id;
    const hasName = !!fullName && fullName.trim().length > 0;
    const hasAddress1 = !!address1 && address1.trim().length > 0;
    const hasAddress2 = !!address2 && address2.trim().length > 0;
    const hasCity = !!city && city.trim().length > 0;
    const hasState = !!state && state.trim().length > 0;
    const hasZipcode = !!zipcode && zipcode.trim().length > 0;

    // if (!hasId) return setError("Id for logged in user not found.");
    if (!hasName) return setError("Name is required.");
    if (!hasAddress1) return setError("Address is required.");
    // if (hasAddress2) {
    //     user.address2 = address2;
    // }
    if (!hasCity) return setError("City is required.");

    if (!hasState) return setError("State is required.");

    if (!hasZipcode) return setError("Zipcode is required.");

    console.log(error);
    setDisabled(true);
    setEditing(false);
    try {
      console.log("saving user...");
      // localStorage.removeItem('user')
      // localStorage.setItem("user", JSON.stringify(user))
      // console.log(user)

      const response = await axios.post(`/api/saveProfile`, {
        token: JSON.parse(token),
        fullName: fullName,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zipcode: zipcode,
      });
      console.log("user saved!");
    } catch (error) {
      console.log(error);
      return setError(
        error.response?.data?.message || "There was an issue saving your info."
      );
    }
  };

  return (
    <div className="bg-gray-400 bg-opacity-90 overflow-auto h-screen">
      <Header />
      <div>
        <div className="m-14 p-8 bg-gray-100 rounded-md ">
          {!!error && <p>{error}</p>}
          <form>
            <TextField
              disabled={disabled}
              label="Full Name"
              type="text"
              margin="none"
              value={fullName}
              onChange={(fullName) => setFullName(fullName.target.value)}
              required
            />
            <br />
            <br />
            <TextField
              disabled={disabled}
              label="Address line 1"
              type="text"
              margin="none"
              value={address1}
              onChange={(address1) => setAddress1(address1.target.value)}
              required
            />
            <br />
            <br />
            <TextField
              disabled={disabled}
              label="Address line 2"
              type="text"
              margin="none"
              value={address2}
              onChange={(address2) => setAddress2(address2.target.value)}
            />
            <br />
            <br />
            <TextField
              disabled={disabled}
              label="City"
              type="text"
              margin="none"
              value={city}
              onChange={(city) => setCity(city.target.value)}
              required
            />
            <br />
            <br />
            <InputLabel htmlFor="state">State</InputLabel>
            <Select
              disabled={disabled}
              label="State"
              type="text"
              margin="none"
              value={state}
              inputProps={{
                name: "state",
                id: "state",
              }}
              onChange={(e) => setState(e.target.value)}
              disabled={disabled}
              required
            >
              <option value={"AL"}>AL</option>
              <option value={"AK"}>AK</option>
              <option value={"AZ"}>AZ</option>
              <option value={"AR"}>AR</option>
              <option value={"CA"}>CA</option>
              <option value={"CO"}>CO</option>
              <option value={"CT"}>CT</option>
              <option value={"DE"}>DE</option>
              <option value={"FL"}>FL</option>
              <option value={"GA"}>GA</option>
              <option value={"HI"}>HI</option>
              <option value={"ID"}>ID</option>
              <option value={"IL"}>IL</option>
              <option value={"IN"}>IN</option>
              <option value={"IA"}>IA</option>
              <option value={"KS"}>KS</option>
              <option value={"KY"}>KY</option>
              <option value={"LA"}>LA</option>
              <option value={"ME"}>ME</option>
              <option value={"MD"}>MD</option>
              <option value={"MA"}>MA</option>
              <option value={"MI"}>MI</option>
              <option value={"MN"}>MN</option>
              <option value={"MS"}>MS</option>
              <option value={"MO"}>MO</option>
              <option value={"MT"}>MT</option>
              <option value={"NE"}>NE</option>
              <option value={"NV"}>NV</option>
              <option value={"NH"}>NH</option>
              <option value={"NJ"}>NJ</option>
              <option value={"NM"}>NM</option>
              <option value={"NY"}>NY</option>
              <option value={"NC"}>NC</option>
              <option value={"ND"}>ND</option>
              <option value={"OH"}>OH</option>
              <option value={"OK"}>OK</option>
              <option value={"OR"}>OR</option>
              <option value={"PA"}>PA</option>
              <option value={"RI"}>RI</option>
              <option value={"SC"}>SC</option>
              <option value={"SD"}>SD</option>
              <option value={"TN"}>TN</option>
              <option value={"TX"}>TX</option>
              <option value={"UT"}>UT</option>
              <option value={"VT"}>VT</option>
              <option value={"VA"}>VA</option>
              <option value={"WA"}>WA</option>
              <option value={"WV"}>WV</option>
              <option value={"WI"}>WI</option>
              <option value={"WY"}>WY</option>
            </Select>
            <br />
            <br />
            <TextField
              disabled={disabled}
              label="Zipcode"
              type="text"
              margin="none"
              value={zipcode}
              onChange={(zipcode) => setZipcode(zipcode.target.value)}
              required
            />
            <br />
            <br />
            {editing ? (
              <Button onClick={handleSave} variant="contained">
                Save
              </Button>
            ) : (
              <Button onClick={handleEdit} variant="contained">
                Edit
              </Button>
            )}

            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
