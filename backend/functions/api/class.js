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
  const { uid: teacherId, email } = req.userClaims;
  const { name: className } = req.body;

  console.log(req.body);
  console.log({ className });

  const classes = db.collection("classes");
  const classRef = classes.doc();

  const teacher = { email, id: teacherId };
  try {
    const classRoom = new Class({
      id: classRef.id,
      name: className,
      teacher,
    });

    await classRef.withConverter(ClassConverter).set(classRoom);

    return res.json({
      data: {
        class: classRoom.toJSON(),
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(400).json({ message: "Something weird happened" });
  }
});

module.exports = router;
