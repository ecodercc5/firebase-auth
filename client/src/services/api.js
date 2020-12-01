import { firebase } from "../firebase";

export class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAuthToken() {
    const token = await firebase.auth().currentUser?.getIdToken();

    return token ? `Bearer ${token}` : null;
  }

  async getHeaders() {
    const authToken = await this.getAuthToken();

    return {
      Authorization: authToken,
    };
  }

  constructEndPoint(pathname) {
    return this.baseUrl + pathname;
  }

  async get(pathname) {
    const headers = await this.getHeaders();

    const endpoint = this.constructEndPoint(pathname);

    const data = await fetch(endpoint, { headers });
    const json = await data.json();

    return json;
  }

  async post(pathname, body = {}) {
    const headers = await this.getHeaders();
    const endpoint = this.constructEndPoint(pathname);

    const data = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const json = await data.json();

    return json;
  }
}
