import { connection } from "../../models";
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  // FIXME add testing for this
  if (!req.query?.username || !req.query?.password) {
    return res
      .status(400)
      .json({ message: "Username or Password not defined" });
  }
  const username = req.query.username;
  const password = req.query.password;

  // get customer from DB with username = requested username
  try {
    const customer = await connection.query(`
    SELECT * 
    FROM user_credentials
    WHERE username = '${username}'`);

    // check if customer exists with that username
    if (
      customer[0].length !== 0 &&
      (await bcrypt.compare(password, customer[0][0]?.hashed_password.trim()))
    ) {
      // Customer found and passwprd is correct

      // if username/password are valid, return token
      const user = { username: username };

      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      return res.status(200).json(token);
    }

    return res
      .status(400)
      .json({ message: "Username or Password not defined" });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

export default handler;
