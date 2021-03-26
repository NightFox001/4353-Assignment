//import { connection, Sequelize } from '.../components/models'
const {quoteHistoryDB} = require('./mockDBs')

const handler = async (req, res) => {
    // Should only be GET requests
    if (req.method !== "GET") {
        return res.status(405).end();
    }
    var history = []
    const id = req.query?.id

    // An id MUST be included
    if (!id) {
        return res.status(400).json({ message: "ID not defined" });
    }

    // Mock quote history data
    // In reality, each quote entry would have its own custid column, but we simplify things here for the sake of testing

    try {
        // Get the quotes with the matching customer id from the DB
        console.log(`Attempting to get quote history with custid = ${id}`)
        for(let i = 0; i < quoteHistoryDB.length; i++) {
            if(quoteHistoryDB[i].userId == id) {
                console.log(`Found a quote for user ${id}`)
                history.push(quoteHistoryDB[i])
            }
        }

        // If no quotes were found
        if(history.length == 0) {
            return res.status(404).json({ message: "No quote history found" })
        }

        console.log("Quote history found")
        //console.log(history)
        return res.status(200).json(history)


    } catch (err) {
        return res.status(403).json({message: err.message})
    }
}


// In reality, this would query the database to get this data, but here it is hard coded
const getQuoteHistory = (user_id) => {
    return [
        
    ]
}

export default handler