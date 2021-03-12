const {quoteHistoryDB} = require('./mockDBs')

const handler = async (req, res) => {
    var history = []
    const id = req.query?.id

    // Mock quote history data
    // In reality, each quote entry would have its own custid column, but we simplify things here for the sake of testing
    /*const quoteHistoryDB = [
        {
            userId: 1,
            quote_id: 11,
            delivery_address : "address!",
            date_requested: "date 1!",
            date_delivered: "date 2!",
            gallons: "gals!",
            rate: "too much!",
            total_price: "really high!"
        },
        {
            userId: 1,
            quote_id: 12,
            delivery_address : "address??",
            date_requested: "date 3!",
            date_delivered: "date 4!",
            gallons: "gals??",
            rate: "too much??",
            total_price: "really high??"
        },
        {
            userId: 1,
            quote_id: 13,
            delivery_address : "address two electric boogaloo",
            date_requested: "date 5!",
            date_delivered: "date 6!",
            gallons: "gals! gals! gals!",
            rate: "too much! or not enough?",
            total_price: "really high! or way to cheap?"
        },
        {
            userId: 1,
            quote_id: 14,
            delivery_address : "address the 4th, awakening",
            date_requested: "date 7!",
            date_delivered: "date 8!",
            gallons: "gals! AND guys!",
            rate: "way to low!",
            total_price: "reasonable despite the rate!"
        }
    ]*/

    try {
        // Get the quotes with the matching customer id from the DB
        console.log(`Attempting to get quote history with custid = ${custId}`)
        for(let i = 0; i < quoteHistoryDB.length; i++) {
            if(quoteHistoryDB[i].userId == custId) {
                console.log(`Found a quote for user ${custId}`)
                history.push(quoteHistoryDB[i])
            }
        }

        // If no quotes were found
        if(history.length == 0) {
            return res.status(404).json({message: "No quote history found"})
        }

        console.log("Quote history found")
        console.log(history)
        return res.status(200).json(history)


    } catch (err) {
        return res.status(403).json({message: error.message})
    }
}


// In reality, this would query the database to get this data, but here it is hard coded
const getQuoteHistory = (user_id) => {
    return [
        
    ]
}

export default handler