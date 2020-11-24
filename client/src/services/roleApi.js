import { Api } from "./api";

class RoleApi extends Api {
  constructor() {
    super("http://localhost:5001/fir-auth-d0f22/us-central1/api/role");
  }

  async setAsTeacher() {
    const result = await this.post("/teacher");
    return result;
  }

  async setAsStudent() {
    const result = await this.post("/student");
    return result;
  }
}

export const roleApi = new RoleApi();
