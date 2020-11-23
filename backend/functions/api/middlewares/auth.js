const { authService } = require("../services/auth");

exports.isAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader)
    return res.status(403).json({ message: "Missing Authorization Header" });

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer")
    return res
      .status(400)
      .json({ message: "Authorization Token Type is not of type Bearer" });

  try {
    const userCredentials = await authService.isAuth(token);

    req.userCredentials = userCredentials;

    return next();
  } catch (err) {
    console.log(err);

    return res.sendStatus(403);
  }
};
