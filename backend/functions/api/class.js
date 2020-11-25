const express = require("express");
const router = express.Router();
const { isAuth, isTeacher } = require("./middlewares/auth");
const { db } = require("../firestore");
const { uid } = require("uid");
const { Class, ClassConverter } = require("./models/class");
const { ROLE } = require("./enums/role");

router.use(isAuth);

router.get("/", async (req, res) => {
  const { role, uid } = req.userClaims;

  let classes = [];
  if (role === ROLE.Teacher) {
    classes = await Class.getClassesByTeacherId(uid);
  }

  return res.json({ data: { classes } });
});

router.post("/", isTeacher, async (req, res) => {
  const { uid: teacherId } = req.userClaims;
  const { name: className } = req.body;

  const classes = db.collection("classes");
  const classRef = classes.doc();

  const classRoom = new Class({
    id: classRef.id,
    name: className,
    teacherId,
  });

  await classRef.withConverter(ClassConverter).set(classRoom);

  return res.json({
    data: {
      class: classRoom.toJSON(),
    },
  });
});

module.exports = router;
