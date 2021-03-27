import { connection, Sequelize } from "../../models";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const handler = async (req, res) => {
  var username;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Use POST method" });
  }
  if (!req.query?.token) {
    return res.status(405).json({ message: "token undefined" });
  }

  const token = JSON.parse(req.query.token);

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) throw "oh no";
      console.log("token after verify: ", user);
      username = user.username;
    });
  } catch (e) {
    console.log(e);
    return res.status(405).json({ message: "error trying verify token" });
  }


  try {
    const customer = await connection.query(
      `SELECT id FROM user_credentials WHERE username = '${username}';`
    );
    if (customer[0].length === 0) {
      return res.status(400).json({
        message: "Customer not found in DB... Try logging out and back in.",
      });
    }

    const id = customer[0][0].id;
    console.log(id);

    //insert new quote info
    console.log("no profile found for " + username);
    await connection.query(`
    BEGIN;
    INSERT INTO fuelquotes (
      credentials_id,
      gallons,
      rate,
      total_price,
      delivery_address1,
      delivery_address2,
      delivery_city,
      delivery_state,
      delivery_zipcode
      )
    VALUES (${id}, ${gallons}, ${rate}, ${total_price}, '${address1}', '${address2}', '${city}', '${state}', '${zipcode}' );`);
    await connection.query('COMMIT;')
  } catch (e) {
    await connection.query('ROLLBACK')
    console.log(e);
  }


//   try {
//     // get customer profile info from DB with userToken that will eventually be provided from login

//     console.log("Getting quote... token: " + token + "\n");
//     console.log("username: ", username);

//     const customer = await connection.query(
//       `SELECT id FROM user_credentials WHERE username = '${username}';`
//     );
//     if (customer[0].length === 0) {
//       return res.status(400).json({
//         message: "Customer not found in DB... Try logging out and back in.",
//       });
//     }
//     // console.log(customer[0][0].id);
//     const credId = customer[0][0].id;
//     console.log("Customer id found! Getting gallons\n");

//     const getQuoteResult = await connection.query(`
// 	SELECT client_address1, client_address2, client_city, client_state, client_zipcode
// 	FROM client_information
// 	WHERE credentials_id = ${credId};`);

//     // check if a profile exists for user (may be first time logging in)

//     // no profile exists
//     if (getQuoteResult[0].length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Please finish creating profile" });
//     }

//     // profile does exist
//     console.log("\n\nprofile found in DB");
//     const getQuote = getQuoteResult[0][0];
//     console.log(getQuote);
//     return res.status(200).json({
//       address1: getQuote.client_address1,
//       address2: getQuote.client_address2,
//       city: getQuote.client_city,
//       state: getQuote.client_state,
//       zipcode: getQuote.client_zipcode,
//     });
//   }
// catch (error) {
//   return res.status(403).json({ message: error.message });
// }
// };


//   const getQuoteDB = {
//     1: {
//       id: 1,
//       gallonsReq: 900,
//       date: "mm/dd/yyyy",
//     },
//     2: {
//       id: 2,
//       gallonsReq: 400,
//       date: "01/01/0101",
//     },
//     3: {
//       id: 3,
//       gallonsReq: 600,
//       date: "02/12/2020",
//     },
//   };

//   try {
//     console.log("Getting fuel quote... id: " + id + "\n");
//     if (!getQuoteDB[id]) {
//       return res
//         .status(400)
//         .json({ message: "fuel quote not found with userToken" });
//     }

//     console.log("Fuel Quote found!\n");
//     gallons = getQuoteDB[id];
//     console.log(gallons);
//     return res.status(200).json(gallons);
//   } catch (error) {
//     return res.status(403).json({ message: error.message });
//   }
 };

export default handler;
