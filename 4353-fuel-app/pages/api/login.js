import { connection, Sequelize } from "../../models";
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

  // const customerDB = [
  //   {
  //     id: 1,
  //     username: "Ironman",
  //     password: "iamironman",
  //     fullName: "Tony Stark",
  //     address1: "10880 Malibu Point",
  //     address2: "",
  //     city: "Malibu",
  //     state: "CA",
  //     zipcode: "90265",
  //   },
  //   {
  //     id: 2,
  //     username: "Thor",
  //     password: "strongestavenger",
  //     fullName: "Thor Odinson",
  //     address1: "1234 rd",
  //     address2: "",
  //     city: "Asgard",
  //     state: "AG",
  //     zipcode: "11111",
  //   },
  //   {
  //     id: 3,
  //     username: "Spiderman",
  //     password: "nowayhome",
  //     fullName: "Peter Parker",
  //     address1: "1234 Queens rd",
  //     address2: "",
  //     city: "New York City",
  //     state: "NY",
  //     zipcode: "12345",
  //   },
  // ];

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
      // console.log("\nLogging in customer...");
      // console.log(customer[0]);

      // if username/password are valid, return token
      const token = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
      // console.log("\n\ntoken: " + token);
      return res.status(200).json(customer[0].id);
    }

    return res.status(400).json({ message: "Incorrect username or password" });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

export default handler;
