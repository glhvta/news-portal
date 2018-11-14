import { API_KEY, TOP_HEADLINES, EVERYTHING } from "../constants/request";

const REQUEST_ENDPOINTS = {
  [TOP_HEADLINES]: "https://newsapi.org/v2/top-headlines",
  [EVERYTHING]: "https://newsapi.org/v2/everything"
};

class Request {
  constructor(type, queries) {
    this.createRequestUrl(type, queries);
  }

  createRequestUrl(type, queries) {
    const queryString = this.createQueryString(queries);

    this._url = `${REQUEST_ENDPOINTS[type]}?${queryString}`;
  }

  createQueryString(queries) {
    let str = `apiKey=${API_KEY}&language=en`;

    for (let key in queries) {
      str = `${str}&${key}=${queries[key]}`;
    }

    return str;
  }

  send() {
    return fetch(this._url).then(res => res.json());
  }
}

export default Request;
