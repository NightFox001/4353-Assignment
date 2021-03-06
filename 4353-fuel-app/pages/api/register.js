import { connection } from "../../models";
const bcrypt = require("bcrypt");

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  if (!req.query?.username || !req.query?.password) {
    return res
      .status(400)
      .json({ message: "Username or Password not defined" });
  }

  const username = req.query.username; //username entered by user
  const hashedPassword = await bcrypt.hash(req.query.password, 10);

  // check if entered username already exists
  try {
    const response = await connection.query(`
    SELECT * 
    FROM user_credentials
    WHERE username = '${username}'`);

    // check if customer exists with that username
    if (response[0].length === 0) {
      try {
        // insert username/password into DB
        await connection.query(
          `BEGIN;
        INSERT INTO user_credentials (username, hashed_password)
        VALUES ('${username}', '${hashedPassword}');`
        );
        await connection.query("COMMIT;");
        return res.status(200).json({ message: "Account Created!" });
      } catch (error) {
        connection.query(`ROLLBACK;`);
        console.log(
          `\n\n\n\n(In api/register.js)\nWhile trying to insert new customer\nwe got this error... \n 
            ${error}`
        );
        return res.status(500).json({ message: error.message });
      }
    } else {
      // username taken
      return res.status(400).json({ message: "Username is not available." });
    }
  } catch (e) {
    console.log(e);
  }
};

export default handler;
