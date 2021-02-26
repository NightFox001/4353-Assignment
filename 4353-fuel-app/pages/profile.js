import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from '../components/Header'
import { red } from "@material-ui/core/colors";
import Select from '@material-ui/core/Select';
import { InputLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const Login = () => {
    const classes = useStyles()
    const router = useRouter()
    const [error, setError] = useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [loadingAccount, setLoadingAccount] = useState(false)


    return (
        <div class=''>
            <Header />
            <div class='bg-gray-400 bg-opacity-95 h-screen'>
    {/* be on Profile page / form:
	- Full Name (50 characters, required)
	- Address 1 (100 characters, required)
	- Address 2 (100 characters, optional)
	- City (100 characters, required)
	- State (Drop Down, selection required) DB will store 2 character state code
- Zipcode (9 characters, at least 5 character code required) */}
            <div class='pl-8'>
                <form className={classes.root}>
                    <TextField 
                        label="Full Name"
                        type="text"
                        margin="normal"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <br /><br />
                    <TextField
                        label="Address 1"
                        type="text"
                        margin="normal"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                        required
                    />
                    <br /><br />
                    <TextField
                        label="Address 2"
                        type="text"
                        margin="normal"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                        
                    />
                    <br /><br />
                    <TextField
                        label="City"
                        type="text"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    <br/><br/>
                    <InputLabel htmlFor='state'>State</InputLabel>
                    <Select
                        label='State'
                        type='text'
                        margin='normal'
                        value={state}
                        inputProps={{
                            name: 'state',
                            id: 'state',
                        }}
                        onChange={(e) => setState(e.target.value)}
                        // <option aria-label="None" value="" />
                        required
                        >
                        <option value={'AL'}>AL</option>
                        <option value={'AK'}>AK</option>
                        <option value={'AZ'}>AZ</option>
                        <option value={'AR'}>AR</option>
                        <option value={'CA'}>CA</option>
                        <option value={'CO'}>CO</option>
                        <option value={'CT'}>CT</option>
                        <option value={'DE'}>DE</option>
                        <option value={'FL'}>FL</option>
                        <option value={'GA'}>GA</option>
                        <option value={'HI'}>HI</option>
                        <option value={'ID'}>ID</option>
                        <option value={'IL'}>IL</option>
                        <option value={'IN'}>IN</option>
                        <option value={'IA'}>IA</option>
                        <option value={'KS'}>KS</option>
                        <option value={'KY'}>KY</option>
                        <option value={'LA'}>LA</option>
                        <option value={'ME'}>ME</option>
                        <option value={'MD'}>MD</option>
                        <option value={'MA'}>MA</option>
                        <option value={'MI'}>MI</option>
                        <option value={'MN'}>MN</option>
                        <option value={'MS'}>MS</option>
                        <option value={'MO'}>MO</option>
                        <option value={'MT'}>MT</option>
                        <option value={'NE'}>NE</option>
                        <option value={'NV'}>NV</option>
                        <option value={'NH'}>NH</option>
                        <option value={'NJ'}>NJ</option>
                        <option value={'NM'}>NM</option>
                        <option value={'NY'}>NY</option>
                        <option value={'NC'}>NC</option>
                        <option value={'ND'}>ND</option>
                        <option value={'OH'}>OH</option>
                        <option value={'OK'}>OK</option>
                        <option value={'OR'}>OR</option>
                        <option value={'PA'}>PA</option>
                        <option value={'RI'}>RI</option>
                        <option value={'SC'}>SC</option>
                        <option value={'SD'}>SD</option>
                        <option value={'TN'}>TN</option>
                        <option value={'TX'}>TX</option>
                        <option value={'UT'}>UT</option>
                        <option value={'VT'}>VT</option>
                        <option value={'VA'}>VA</option>
                        <option value={'WA'}>WA</option>
                        <option value={'WV'}>WV</option>
                        <option value={'WI'}>WI</option>
                        <option value={'WY'}>WY</option>
                        </Select>
                        <br/><br/>
                        <TextField
                        label="Zipcode"
                        type="text"
                        margin="normal"
                        value={zipcode}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    <br/><br/>
                        
                </form>
            </div>
            </div>
        </div>

    )
}

export default Login
