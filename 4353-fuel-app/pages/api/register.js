// import { connection, Sequelize } from '../../models'

const handler = async (req, res) => {

    // try getting list of usernames from DB
    try {
        // customers = SELECT all customer usernames from database
        var customers = [
            {customer_username: "Ironman"},
            {customer_username: "Spiderman"},
            {customer_username: "Thor"},
        ]
    } 
    catch (error) {
        return res.status(500).json({ message: error.message })
    }

    const username = req.query?.username //username entered by user
    const password = req.query?.password //password entered by user

    // check if entered username already exists 
    for (var i = 0; i < customers.length; i++) {
        if (customers[i].customer_username === username) {
            return res.status(400).json({ message: "Username is not available." })
        }
    }

    try {
        // insert username/password into DB
        return res.status(200).json({ message: "Account Created!"})

    } catch (error) {
        console.log(
        `\n\n\n\n(In api/register.js)\nWhile trying to insert new customer\nwe got this error... \n 
        ${error}`)
        return res.status(500).json({ message: error.message })
    }

}

export default handler
