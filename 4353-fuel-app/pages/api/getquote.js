// import { connection, Sequelize } from '../../models'
//const {getQuoteDB} = require('./mockDBs')


const handler = async (req, res) => {
	let gallons = null
	const id = req.query?.id

	const getQuoteDB = {
		1: {
			id: 1,
			gallonsReq: gallonsReq,
			date: date
	 	},
		2: {
			id: 2,
			gallonsReq: gallonsReq,
			date: date
		},
		3: {
			id: 3,
			gallonsReq: gallonsReq,
			date: date
		},
	}


	try {
		console.log("Getting fuel quote... id: "+ id + "\n")
		if (!getQuoteDB[id]) {
			return res.status(400).json({ message: "fuel quote not found with userID" })
		} 
	
		console.log("Fuel Quote found!\n")
		gallons = getQuoteDB[id]
		console.log(gallons)
		return res.status(200).json(gallons)

	} catch(error) {
		return res.status(403).json({ message: error.message })
	}
}

export default handler