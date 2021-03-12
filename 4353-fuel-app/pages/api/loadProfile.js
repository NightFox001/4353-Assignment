// import { connection, Sequelize } from '../../models'
const {customerDB} = require('./mockDBs')


const handler = async (req, res) => {
	var customer = null
	const id = req.query?.id

	// mock data
	/*const customerDB = {
		1: {
			id: 1,
			username: "Ironman", 
			password: "iamironman",
			fullName: "Tony Stark",
			address1: "10880 Malibu Point",
			address2: "",
			city: "Malibu",
			state: "CA",
			zipcode: "90265",
	 	},
		2: {
			id: 2,
			username: "Thor", 
			password: "strongestavenger",
			fullName: "Thor Odinson",
			address1: "1234 rd",
			address2: "",
			city: "Asgard",
			state: "AG",
			zipcode: "11111",
		},
		3: {
			id: 3,
			username: "Spiderman", 
			password: "nowayhome",
			fullName: "Peter Parker",
			address1: "1234 Queens rd",
			address2: "",
			city: "New York City",
			state: "NY",
			zipcode: "12345",
		},
	}*/
 
	try {
		// get customer profile info from DB with userId that will eventually be provided from login

		console.log("Getting profile... id: "+ id + "\n")
		if (!customerDB[id]) {
			return res.status(400).json({ message: "Customer not found with userID" })
		} 
	
		console.log("Customer profile found!\n")
		customer = customerDB[id]
		return res.status(200).json(customer)

	} catch(error) {
		return res.status(403).json({ message: error.message })
	}
}

export default handler