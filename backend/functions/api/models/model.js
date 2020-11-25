class Model {
  constructor({ id }) {
    this.id = id;
  }

  toJSON() {
    return Object.assign({}, this);
  }
}

exports.Model = Model;
