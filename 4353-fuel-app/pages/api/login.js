// import { connection, Sequelize } from '../../models'


const handler = async (req, res) => {
	let customer = null
	const username = req.query?.username
	const password = req.query?.password

	try {
		customer = await connection.query(`
		SELECT userId 
		FROM TableName 
		WHERE customer_username = ' + username + ' 
		AND password = ' + password + ';`, {
			type: Sequelize.QueryTypes.SELECT
		});
		
		if (customer.length === 0) {
			return res.status(400).json({ message: "Incorrect username or password" })
		}

	} catch(error) {
		return res.status(403).json({ message: error.message })
	}

	return res.json(customer[0])
}

export default handler