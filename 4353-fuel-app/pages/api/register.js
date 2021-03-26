import { connection, Sequelize } from "../../models";
const bcrypt = require("bcrypt");

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username or Password not defined" });
  }

  var customers = [
    { customer_username: "Ironman" },
    { customer_username: "Spiderman" },
    { customer_username: "Thor" },
  ];
  const username = req.query?.username; //username entered by user
  const password = req.query?.password; //password entered by user
  const hashedPassword = await bcrypt.hash(password, 10);

  // check if entered username already exists
  try {
    const response = await connection.query(`
    SELECT * 
    FROM user_credentials
    WHERE username = ${username}`);

    // no customer exists with that username
    if (response.length === 0) {
      // inster customer into DB
      connection.query(`
      BEGIN;
      INSERT INTO dbiqsajdg6jh7e.user_credentials (username, password)
      VALUES ('${username}, '${hashedPassword})
      ;
      `);
    } else {
      // username taken
      return res.status(400).json({ message: "Username is not available." });
    }
  } catch (e) {
    console.log(e);
  }

  try {
    // insert username/password into DB
    return res.status(200).json({ message: "Account Created!" });
  } catch (error) {
    console.log(
      `\n\n\n\n(In api/register.js)\nWhile trying to insert new customer\nwe got this error... \n 
        ${error}`
    );
    return res.status(500).json({ message: error.message });
  }
};

export default handler;
