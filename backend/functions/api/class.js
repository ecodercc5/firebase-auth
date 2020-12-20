const express = require("express");
const router = express.Router();
const { isAuth, isTeacher, isStudent } = require("./middlewares/auth");
const { db, admin } = require("../firestore");
const { Class, ClassConverter } = require("./models/class");
const { ROLE } = require("./enums/role");

router.use(isAuth);

router.get("/", async (req, res) => {
  const { role, uid } = req.userClaims;

  let classes = [];
  if (role === ROLE.Teacher) {
    classes = await Class.getClassesByTeacherId(uid);
  } else if (role === ROLE.Student) {
    classes = await Class.getClassesByStudentId(uid);
  }

  return res.json({ data: { classes } });
});

// adding a class
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

// joining a class
router.post("/join/:classCode", isStudent, async (req, res) => {
  const studentId = req.userClaims.uid;
  const classCode = req.params.classCode;

  console.log({ classCode });

  // query for the class with the code passed into the url param
  const classRoomQuery = await db
    .collection("classes")
    .where("code", "==", classCode)
    .withConverter(ClassConverter)
    .get();
  const classRoom = classRoomQuery.empty ? null : classRoomQuery.docs[0].data();

  console.log({ classRoom });

  if (!classRoom) {
    return res.status(400).json({ message: "Class does not exists" });
  }

  const studentRef = db.collection("users").doc(studentId);

  // add the class id to the classIds field of the student
  await studentRef.update({
    classIds: admin.firestore.FieldValue.arrayUnion(classRoom.id),
  });

  return res.json({ data: { class: classRoom.toJSON() } });
});

module.exports = router;
