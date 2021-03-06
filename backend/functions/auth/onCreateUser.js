const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { db } = require("../firestore");

exports.onCreateUser = functions.auth.user().onCreate((user) => {
  const { email, uid } = user;

  const userDoc = db.collection("users").doc(uid);

  return userDoc.set({ email, uid, role: null });
});
