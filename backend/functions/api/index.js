const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

// routes
const roleRoutes = require("./role");

const { isAuth } = require("./middlewares/auth");

const app = express();

app.use(cors());

app.get("/whrolly", isAuth, (req, res) => res.json({ data: "Whrolly" }));

app.use("/role", roleRoutes);

module.exports = functions.https.onRequest(app);
