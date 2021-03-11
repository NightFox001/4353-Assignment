// import { connection, Sequelize } from '../../models'


const handler = async (req, res) => {
	var customer = null
	const username = req.query?.username
	const password = req.query?.password

	// mock data
	const customerDB = [
		{
			customer_username: "Ironman", 
			customer_password: "iamironman"
	 	},
		{ 
			customer_username: "Thor", 
			customer_password: "strongestavenger"
		},
		{
			customer_username: "Spiderman", 
			customer_password: "nowayhome"
		},
	]
 
	try {
		// get customer from DB with username = requested username

		console.log('\ntrying to login with username = '+ username)
		for (let i = 0; i < customerDB.length; i++) {
			if (customerDB[i].customer_username === username) {
				console.log("Customer found!\n")
				if (customerDB[i].customer_password === password) {
					console.log("Correct password!\n")
					customer = customerDB[i]
				}
			}
		}

		// check if a customer with that username exists
		if (!customer) {
			return res.status(400).json({ message: "Incorrect username or password" })
		} 

	} catch(error) {
		return res.status(403).json({ message: error.message })
	}
	return res.json(customer)
}

export default handler