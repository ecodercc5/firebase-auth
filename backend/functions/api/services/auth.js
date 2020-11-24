const admin = require("firebase-admin");

exports.authService = {
  isAuth: (token) => {
    return admin.auth().verifyIdToken(token);
  },
};
