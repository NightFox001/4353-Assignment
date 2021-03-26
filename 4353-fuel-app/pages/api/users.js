const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const users = [];

const handler = async (req, res) => {
  if (req.query?.list) return res.status(200).json({ users: users });

  const username = req.query?.username;
  const password = req.query?.password;
  const hashedPass = await bcrypt.hash(password, 10);

  const user = { username: username, password: hashedPass };
  users.push(user);
  return res.status(200).json({ message: "user added" });
};

export default handler;
