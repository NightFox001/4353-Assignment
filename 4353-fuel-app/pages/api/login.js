// import { connection, Sequelize } from '../../models'

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  var customer;
  const username = req.query?.username;
  const password = req.query?.password;

  const customerDB = [
    {
      id: 1,
      username: "Ironman",
      password: "iamironman",
      fullName: "Tony Stark",
      address1: "10880 Malibu Point",
      address2: "",
      city: "Malibu",
      state: "CA",
      zipcode: "90265",
    },
    {
      id: 2,
      username: "Thor",
      password: "strongestavenger",
      fullName: "Thor Odinson",
      address1: "1234 rd",
      address2: "",
      city: "Asgard",
      state: "AG",
      zipcode: "11111",
    },
    {
      id: 3,
      username: "Spiderman",
      password: "nowayhome",
      fullName: "Peter Parker",
      address1: "1234 Queens rd",
      address2: "",
      city: "New York City",
      state: "NY",
      zipcode: "12345",
    },
  ];

  try {
    // get customer from DB with username = requested username

    console.log("\ntrying to login with username = " + username);
    for (let i = 0; i < customerDB.length; i++) {
      if (customerDB[i].username === username) {
        console.log("Customer found!\n");
        if (customerDB[i].password === password) {
          console.log("Correct password!\n");
          customer = customerDB[i];
          console.log("the customer we found " + JSON.stringify(customer));
          console.log("returning id: " + customer.id);
          return res.status(200).json(customer.id);
        }
      }
    }

    // check if a customer with that username exists
    if (!customer) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    }
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

export default handler;
