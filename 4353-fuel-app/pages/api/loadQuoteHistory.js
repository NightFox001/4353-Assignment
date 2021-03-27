import { connection, Sequelize } from "../../models";
require("dotenv").config();
const {quoteHistoryDB} = require('./mockDBs')
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
    // Should only be GET requests
    if (req.method !== "GET") {
        return res.status(405).end();
    }
    var username;
    // A token MUST be included
    if (!req.query?.token) {
        return res.status(400).json({ message: "token undefined" });
    }

    const token = JSON.parse(req.query.token)

    // Verify the token
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if( err ) throw "oopsy";
            console.log("token after verification: ", user);
            username = user.username;
        });
    } catch (err) {
        console.log(err);
        return res.status(405).json({ message: "error verifying token" });
    }

    // Get the quotes with the matching customer id from the DB
    try {
        console.log(`Attempting to get quote history with username = ${username}`);
        // Get the id of the customer with that username
        const customer = await connection.query(`
        SELECT  id
        FROM    user_credentials
        WHERE   username = '${username}';
        `);

        // Extract the credentials id from the result
        const credentials_id = customer[0][0].id;

        // Get the quote history from the DB
        const history = await connection.query(`
        SELECT  *
        FROM    fuelquotes
        WHERE   credentials_id = '${credentials_id}';
        `);

        const quotes = history[0];
        //console.log("Quote History:\n", quotes)

        // If no quotes were found
        if(quotes.length == 0) {
            return res.status(404).json({ message: "No quote history found" })
        }

        console.log("Quote history found")
        //console.log(history)
        return res.status(200).json(quotes)


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