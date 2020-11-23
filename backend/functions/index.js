const api = require("./api");
const { onCreateUser } = require("./auth/onCreateUser");

exports.api = api;
exports.onCreateUser = onCreateUser;
