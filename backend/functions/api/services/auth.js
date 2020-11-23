const admin = require("firebase-admin");

exports.authService = {
  isAuth: async (token) => {
    return admin
      .auth()
      .verifyIdToken(token)
      .catch(() => null);
  },
};
