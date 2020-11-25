const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const { db } = require("../firestore");
const { isAuth } = require("./middlewares/auth");
const { ROLE } = require("./enums/role");

router.use(isAuth);

router.post("/teacher", async (req, res) => {
  const { uid } = req.userClaims;

  const userRef = db.collection("users").doc(uid);

  await admin.auth().setCustomUserClaims(uid, { role: ROLE.Teacher });

  await userRef.update({ role: ROLE.Teacher });

  return res.json({ success: true });
});

router.post("/student", async (req, res) => {
  const { uid } = req.userClaims;

  const userRef = db.collection("users").doc(uid);

  await admin.auth().setCustomUserClaims(uid, { role: ROLE.Student });

  await userRef.update({ role: ROLE.Student });

  return res.json({ success: true });
});

module.exports = router;
