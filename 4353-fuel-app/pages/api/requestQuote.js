import { connection } from "../../models";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handler = async (req, res) => {
  var username;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Use GET method" });
  }
  if (!req.query?.token) {
    return res.status(405).json({ message: "token undefined" });
  }

  const token = JSON.parse(req.query.token);
  const gallons = req.query?.gallons ?? undefined;
  const state = req.query?.state;

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

    // later check if customer with this username is a previous custom

    // but rn just returning hard coded price/rate
    console.log("gallons: " + gallons);
    res.status(200).json({ pricePG: 2, gallonsQuoted: gallons });

    //insert new quote info
    // await connection.query(`
    // BEGIN;
    // INSERT INTO fuelquotes (
    //   credentials_id,
    //   gallons,
    //   rate,
    //   total_price,
    //   delivery_address1,
    //   delivery_address2,
    //   delivery_city,
    //   delivery_state,
    //   delivery_zipcode
    //   )
    // VALUES (${id}, ${gallons}, ${rate}, ${total_price}, '${address1}', '${address2}', '${city}', '${state}', '${zipcode}' );`);
    // await connection.query('COMMIT;')
  } catch (e) {
    // await connection.query('ROLLBACK')
    console.log(e);
  }
};

export default handler;
