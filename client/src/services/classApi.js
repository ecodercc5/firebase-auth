const { Api } = require("./api");

class ClassApi extends Api {
  constructor() {
    super("http://localhost:5001/fir-auth-d0f22/us-central1/api/class");
  }

  async getClasses() {
    const res = await this.get("/");
    return res.data.classes;
  }
}

export const classApi = new ClassApi();
