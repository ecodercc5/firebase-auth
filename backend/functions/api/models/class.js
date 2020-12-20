const { Model } = require("./model");
const { uid } = require("uid");
const { db } = require("../../firestore");

class Class extends Model {
  constructor({ id, name, code = uid(6), teacher }) {
    super({ id });
    this.name = name;
    this.code = code;
    this.teacher = teacher;
  }

  static async getClassesByTeacherId(teacherId) {
    const classesQuery = db
      .collection("classes")
      .where("teacher.id", "==", teacherId);
    const snapshots = await classesQuery.withConverter(ClassConverter).get();

    const classDocs = snapshots.docs.map((doc) => doc.data());
    return classDocs;
  }

  static async getClassesByStudentId(studentId) {
    const studentRef = db.collection("users").doc(studentId);
    const studentSnapshot = await studentRef.get();
    const student = studentSnapshot.exists ? studentSnapshot.data() : null;

    if (!student) return [];

    const classIds = student.classIds || [];
    const classes = await Promise.all(
      classIds.map(async (id) => {
        const classRoomRef = db.collection("classes").doc(id);
        const classRoomSnapshot = await classRoomRef
          .withConverter(ClassConverter)
          .get();

        const classRoom = classRoomSnapshot.data();

        return classRoom;
      })
    );

    return classes;
  }
}

const ClassConverter = {
  toFirestore: (classObj) => {
    const { name, code, teacher } = classObj;
    return { name, code, teacher };
  },

  fromFirestore: (snapshot, options) => {
    const id = snapshot.id;
    const data = snapshot.data(options);

    return new Class({ id, ...data });
  },
};

exports.Class = Class;
exports.ClassConverter = ClassConverter;
