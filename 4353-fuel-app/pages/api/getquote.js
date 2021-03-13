// import { connection, Sequelize } from '../../models'
//const {getQuoteDB} = require('./mockDBs')

import getQuote from "../getQuote"


const handler = async (req, res) => {
	let gallons = null
	const id = req.query?.id

	const getQuoteDB = {
		1: {
			id: 1,
			gallonsReq: 900,
			date: 'mm/dd/yyyy'
	 	},
		2: {
			id: 2,
			gallonsReq: 400,
			date: '01/01/0101'
		},
		3: {
			id: 3,
			gallonsReq: 600,
			date: '02/12/2020'
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