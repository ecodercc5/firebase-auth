import { firebase } from "../firebase";

export class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAuthToken() {
    const token = await firebase.auth().currentUser?.getIdToken();

    return token ? `Bearer ${token}` : null;
  }

  constructEndPoint(pathname) {
    return this.baseUrl + pathname;
  }

  async get(pathname) {
    const endpoint = this.constructEndPoint(pathname);

    const data = await fetch(endpoint);
    const json = await data.json();

    return json;
  }
}
