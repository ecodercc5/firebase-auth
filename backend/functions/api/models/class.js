const { Model } = require("./model");
const { uid } = require("uid");
const { db } = require("../../firestore");

class Class extends Model {
  constructor({ id, name, code = uid(6), numStudents = 0, teacherId }) {
    super({ id });
    this.name = name;
    this.code = code;
    this.numStudents = numStudents;
    this.teacherId = teacherId;
  }

  static async getClassesByTeacherId(teacherId) {
    const classesQuery = db
      .collection("classes")
      .where("teacherId", "==", teacherId);
    const snapshots = await classesQuery.withConverter(ClassConverter).get();

    const classDocs = snapshots.docs.map((doc) => doc.data());
    return classDocs;
  }
}

const ClassConverter = {
  toFirestore: (classObj) => {
    const { name, code, numStudents, teacherId } = classObj;
    return { name, code, numStudents, teacherId };
  },

  fromFirestore: (snapshot, options) => {
    const id = snapshot.id;
    const data = snapshot.data(options);

    return new Class({ id, ...data });
  },
};

exports.Class = Class;
exports.ClassConverter = ClassConverter;