const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const { isAuth } = require("./middlewares/auth");

const app = express();

app.use(cors());

app.get("/whrolly", isAuth, (req, res) => res.json({ data: "Whrolly" }));

module.exports = functions.https.onRequest(app);
