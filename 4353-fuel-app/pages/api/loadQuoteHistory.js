const handler = async (req, res) => {
    var history = []
    const custId = req.query?.id

    // Mock quote history data
    // In reality, each quote entry would have its own custid column, but we simplify things here for the sake of testing
    const quoteHistoryDB = [
        {
            userId: 1,
            quote_id: 12,
            delivery_address : "10880 Malibu Point",
            date_requested: "1/11/2021",
            date_delivered: "2/11/2021",
            gallons: 200,
            rate: 2,
            total_price: 2000,
        },
        {
            userId: 1,
            quote_id: 13,
            delivery_address : "10880 Malibu Point",
            date_requested: "2/12/2021",
            date_delivered: "3/12/2021",
            gallons: 300,
            rate: 3,
            total_price: 3000,
        },
        {
            userId: 1,
            quote_id: 14,
            delivery_address : "10880 Malibu Point",
            date_requested: "3/13/2021",
            date_delivered: "4/13/2021",
            gallons: 400 ,
            rate: 4,
            total_price: 4000
        },
        {
            userId: 1,
            quote_id: 15,
            delivery_address : "10880 Malibu Point",
            date_requested: "4/14/2021",
            date_delivered: "5/14/2021",
            gallons: 500,
            rate: 5,
            total_price: 5000,
        },
    ]

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