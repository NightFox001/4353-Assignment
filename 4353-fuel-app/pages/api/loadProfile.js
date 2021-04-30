import { connection } from "../../models";
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  var username;
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Use GET method" });
  }
  if (!req.query?.token) {
    return res.status(405).json({ message: "token undefined" });
  }

  const token = JSON.parse(req.query.token);
  //   console.log(token);

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) throw "oh no";
      username = user.username;
    });
  } catch (e) {
    console.log(e);
    return res.status(405).json({ message: "error trying verify token" });
  }

  try {
    // get customer profile info from DB with userToken that will eventually be provided from login
    const customer = await connection.query(
      `SELECT id FROM user_credentials WHERE username = '${username}';`
    );
    if (customer[0].length === 0) {
      return res.status(400).json({
        message: "Customer not found in DB... Try logging out and back in.",
      });
    }
    const credId = customer[0][0].id;
    const profileResult = await connection.query(`
	SELECT * 
	FROM client_information
	WHERE credentials_id = ${credId};`);

    // check if a profile exists for user (may be first time logging in)
    // no profile exists
    if (profileResult[0].length === 0) {
      return res
        .status(400)
        .json({ message: "Please finish creating profile" });
    }

    // profile does exist
    const profile = profileResult[0][0];
    // console.log(profile);
    return res.status(200).json({
      fullName: profile.client_name,
      address1: profile.client_address1,
      address2: profile.client_address2,
      city: profile.client_city,
      state: profile.client_state,
      zipcode: profile.client_zipcode,
    });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

export default handler;
