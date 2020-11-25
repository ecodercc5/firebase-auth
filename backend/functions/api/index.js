const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

// routes
const roleRoutes = require("./role");
const classRoutes = require("./class");

const { isAuth } = require("./middlewares/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/whrolly", isAuth, (req, res) => res.json({ data: "Whrolly" }));

app.use("/role", roleRoutes);

app.use("/class", classRoutes);

module.exports = functions.https.onRequest(app);
