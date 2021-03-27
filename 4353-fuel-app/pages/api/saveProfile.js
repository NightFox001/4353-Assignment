import { connection, Sequelize } from "../../models";
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  console.log("\n\nSaving profile\n");
  console.log(req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Use POST method" });
  }
  if (!req.body?.token) {
    return res.status(405).json({ message: "token undefined" });
  }

  var username;
  const token = req.body.token;
  const fullName = req.body?.fullName.trim();
  const address1 = req.body?.address1.trim();
  const address2 = req.body?.address2.trim();
  const city = req.body?.city.trim();
  const state = req.body?.state;
  const zipcode = req.body?.zipcode;

  // const hasId = !!id;
  // const hasAddress2 = !!address2 && address2.trim().length > 0;

  const invalidName =
    !fullName || /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/.test(fullName);
  const invalidAddress =
    !address1 || /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/.test(address1);
  const invalidCity =
    !city?.length > 0 || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/.test(city);
  const invalidState = state?.length !== 2 || !/^[a-zA-Z]+$/.test(state);
  const invalidZipcode = !/\d\d\d\d\d(-\d\d\d\d)?$/.test(zipcode);

  // 'validate' input second time in back-end
  // if (!hasId) {
  //   return res
  //     .status(400)
  //     .json({ message: "Id for logged in user not found." });
  // }
  if (invalidName)
    return res.status(400).json({ message: "Server Recieved Invalid Name." });

  if (invalidAddress)
    return res
      .status(400)
      .json({ message: "Server Recieved Invalid Address." });
  //   if (!hasAddress2) {} FIX
  //   if (!hasCity) return res.status(400).json({ message: "City is required." });
  if (invalidCity)
    return res.status(400).json({ message: "Server Recieved Invalid City." });
  if (invalidState)
    return res.status(400).json({ message: "Server Recieved Invalid State." });

  if (invalidZipcode)
    return res
      .status(400)
      .json({ message: "Server Recieved Invalid Zipcode." });

  // get username from token
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

  // insert the new values into database for customer with id = id

  try {
    console.log("Getting profile in saveProfile... token: " + token + "\n");
    console.log("username: ", username);

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

    const user = await connection.query(`
    SELECT * 
    FROM client_information
    WHERE credentials_id = ${id}`);

    // check if user has profile saved already (may be first time loggin in)
    if (user[0].length === 0) {
      //insert new profile info
      console.log("no profile found for " + username);
      await connection.query(`
      INSERT INTO client_information (
        credentials_id,
        client_name,
        client_address1,
        client_address2,
        client_city,
        client_state,
        client_zipcode
        )
      VALUES (${id}, '${fullName}', '${address1}', '${address2}', '${city}', '${state}', '${zipcode}' );`);
    } else {
      // update profile info
      await connection.query(`
      UPDATE client_information
      SET \n
        credentials_id = ${id}, \n
        client_name = '${fullName}', \n
        client_address1 = '${address1}', \n
        client_address2 = '${address2}', \n
        client_city = '${city}', \n
        client_state = '${state}', \n
        client_zipcode = '${zipcode}' \n
      WHERE credentials_id = ${id};`);
    }
  } catch (e) {
    console.log(e);
  }

  return res.status(200).json({ message: "Profile saved to DB!" });
};

export default handler;
