import Sequelize from "sequelize";

const creds = {
  database: "dbiqsajdg6jh7e",
  username: "voptduqgddbiix",
  password: "7f8fa3ad1d35e27664e9a2f530846099fbceb4b4d86a0c40303b8e90dae73db4",
  host: "ec2-52-7-115-250.compute-1.amazonaws.com",
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

// const { database, username, password, ...config } = creds;

const connection = new Sequelize(creds);

module.exports = { connection, Sequelize };
