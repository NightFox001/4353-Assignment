import { connection } from "../../models";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Use POST method" });
  }
  if (!req.body?.token) {
    return res.status(405).json({ message: "Token undefined" });
  }

  var username;
  const token = JSON.parse(req.body.token);
  const address1 = req.body?.address1.trim();
  const address2 = req.body?.address2.trim();
  const city = req.body?.city.trim();
  const state = req.body?.state;
  const zipcode = req.body?.zipcode;
  const gallons = req.body?.gallons;
  const rate = req.body?.rate;
  const total_price = req.body?.total;
  const date = req.body?.date;

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) throw "error trying to verify token";
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

    //insert new quote info
    await connection.query(`
    BEGIN;
    INSERT INTO fuelquotes (
      credentials_id,
      gallons,
      rate,
      total_price,
      delivery_date,
      delivery_address1,
      delivery_address2,
      delivery_city,
      delivery_state,
      delivery_zipcode
      )
    VALUES (${id}, ${gallons}, ${rate}, ${total_price}, '${date}', '${address1}', '${address2}', '${city}', '${state}', '${zipcode}' );
    COMMIT;
    `);
    res.status(200).json({ message: "All good" });
  } catch (e) {
    await connection.query("ROLLBACK");
    console.log(e);
    res.status(500).json({ message: "Error inserting into DB" });
  }
};

export default handler;
