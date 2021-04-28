import { connection } from "../../models";
import axios from "axios";
import React, { Component, useEffect } from "react";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handler = async (req, res) => {
  var username;

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
    const customer = await connection.query(
      `SELECT id FROM user_credentials WHERE username = '${username}';`
    );
    if (customer[0].length === 0) {
      return res.status(400).json({
        message: "Customer not found in DB... Try logging out and back in.",
      });
    }

    var hasHistory = false;
    // later check if customer with this customerID is a previous customer
    const quoteHistory = await connection.query(
      `SELECT * FROM fuelquotes WHERE credentials_id = ${customer[0][0].id}`
    );
    if (quoteHistory[0].length !== 0) {
      hasHistory = true;
    }

    var inState = 0.04;
    if (state.includes("TX")) {
      inState = 0.02;
    }

    var GR;
    if (gallons > 1000) {
      GR = 0.02;
    } else {
      GR = 0.03;
    }

    var hist = 0.01;

    //check for history quote

    var margin = (inState - hist + GR + 0.1) * 1.5;

    // but rn just returning hard coded price/rate
    res.status(200).json({ rate: margin + 1.5, gallonsQuoted: gallons });

    // await connection.query('COMMIT;')
  } catch (e) {
    // await connection.query('ROLLBACK')
    console.log(e);
  }
};

export default handler;
