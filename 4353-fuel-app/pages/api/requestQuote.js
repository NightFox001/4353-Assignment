import { connection } from "../../models";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handler = async (req, res) => {
  var username;
  var stateFactor = 0.04; // default. 0.02 if state is TX
  var gallonsReqFactor = 0.03; // default. 0.02 if req more than 1000 gals
  var historFactor = 0.01; // default. 0.00 if user has no history.
  const profitFactor = 0.1;
  const currentPrice = 1.5;

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
    // make sure user exist in DB
    const customer = await connection.query(
      `SELECT id FROM user_credentials WHERE username = '${username}';`
    );
    if (customer[0].length === 0) {
      return res.status(400).json({
        message: "Customer not found in DB... Try logging out and back in.",
      });
    }

    // check if this user is a previous customer
    const quoteHistory = await connection.query(
      `SELECT * FROM fuelquotes WHERE credentials_id = ${customer[0][0].id}`
    );
    if (quoteHistory[0].length !== 0) {
      historFactor = 0;
    }

    if (state.includes("TX")) {
      stateFactor = 0.02;
    }
    if (gallons > 1000) {
      gallonsReqFactor = 0.02;
    }
    var margin =
      currentPrice *
      (stateFactor - historFactor + gallonsReqFactor + profitFactor);

    const rate = currentPrice + margin;

    // FIXME
    res.status(200).json({ rate: rate.toFixed(2), gallonsQuoted: gallons });
  } catch (e) {
    console.log(e);
  }
};

export default handler;
