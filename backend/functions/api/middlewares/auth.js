const { ROLE } = require("../enums/role");
const { authService } = require("../services/auth");

exports.isAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader)
    return res.status(401).json({ message: "Missing Authorization Header" });

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer")
    return res
      .status(400)
      .json({ message: "Authorization Token Type is not of type Bearer" });

  try {
    const userClaims = await authService.isAuth(token);

    req.userClaims = userClaims;

    return next();
  } catch (err) {
    console.log(err);

    return res.sendStatus(401);
  }
};

exports.isTeacher = (req, res, next) => {
  const { role } = req.userClaims;

  console.log({ role });

  if (role !== ROLE.Teacher)
    return res.status(401).json({ message: "Unauthorized, not a teacher" });

  return next();
};

exports.isStudent = (req, res, next) => {
  const { role } = req.userClaims;

  console.log({ role });

  if (role !== ROLE.Student)
    return res.status(401).json({ message: "Unauthorized, not a student" });

  return next();
};
