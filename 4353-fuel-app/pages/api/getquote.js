// import { connection, Sequelize } from '../../models'


const handler = async (req, res) => {
	let gallons = null
	const custid = req.query?.custid

    const getQuoteDB = [
        {
            custid: "1",
            quotes: [
                {
                    quote_id: "1",
                    delivery_address : 250,

                },
                {
                    quote_id: "2",
                },
                {
                    quote_id: "3",
                },
                {
                    quote_id: "4",
                }
            ]
        }
    ]

    try {
        // Get the quotes with the matching customer id from the DB
        console.log(`Attempting to get quote history with custid = ${custid}`)
        for(let i = 0; i < getQuoteDB.length; i++) {
            console.log(getQuoteDB[i].custid)
            if(getQuoteDB[i].custid === custid) {
                console.log('Customer found')
                gallons = getQuoteDB[i].quotes
            }
        }
		if(!gallons) {
            return res.status(404).json({message: "No quote history found"})
        }
    } 
	 catch(error)
	{
		return res.status(403).json({ message: error.message })
	}
	return res.json(gallons[0])
}

export default handler