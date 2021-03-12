const handler = async (req, res) => {
    var history = null
    const custid = req.query?.custid

    // Mock quote history data
    // In reality, each quote entry would have its own custid column, but we simplify things here for the sake of testing
    const quoteHistoryDB = [
        {
            custid: "1",
            quotes: [
                {
                    quote_id: "1",
                    delivery_address : "address!",
                    date_requested: "date 1!",
                    date_delivered: "date 2!",
                    gallons: "gals!",
                    rate: "too much!",
                    total_price: "really high!"
                },
                {
                    quote_id: "2",
                    delivery_address : "address??",
                    date_requested: "date 3!",
                    date_delivered: "date 4!",
                    gallons: "gals??",
                    rate: "too much??",
                    total_price: "really high??"
                },
                {
                    quote_id: "3",
                    delivery_address : "address two electric boogaloo",
                    date_requested: "date 5!",
                    date_delivered: "date 6!",
                    gallons: "gals! gals! gals!",
                    rate: "too much! or not enough?",
                    total_price: "really high! or way to cheap?"
                },
                {
                    quote_id: "4",
                    delivery_address : "address the 4th, awakening",
                    date_requested: "date 7!",
                    date_delivered: "date 8!",
                    gallons: "gals! AND guys!",
                    rate: "way to low!",
                    total_price: "reasonable despite the rate!"
                }
            ]
        }
    ]

    try {
        // Get the quotes with the matching customer id from the DB
        console.log(`Attempting to get quote history with custid = ${custid}`)
        for(let i = 0; i < quoteHistoryDB.length; i++) {
            console.log(quoteHistoryDB[i].custid)
            if(quoteHistoryDB[i].custid === custid) {
                console.log('Customer found')
                history = quoteHistoryDB[i].quotes
            }
        }

        if(!history) {
            return res.status(404).json({message: "No quote history found"})
        }
    } catch (err) {
        return res.status(403).json({message: error.message})
    }

    console.log(history)
    return res.json(history)

}


// In reality, this would query the database to get this data, but here it is hard coded
const getQuoteHistory = (user_id) => {
    return [
        
    ]
}

export default handler