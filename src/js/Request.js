import { API_KEY } from "./constants/request";
import { TOP_HEADLINES, EVERYTHING } from "./constants/request";

const REQUEST_ENDPOINTS = {
  [TOP_HEADLINES]: "https://newsapi.org/v2/top-headlines",
  [EVERYTHING]: "https://newsapi.org/v2/everything"
};

class Request {
  constructor(type, queries) { //add options with url by default
    console.log(type,queries)
    this.createRequestUrl(type, queries);
  }

  createRequestUrl(type, queries) {
    const queryString = this.createQueryString(queries);
    console.log(type)
    this._url = `${REQUEST_ENDPOINTS[type]}?${queryString}`;
  }

  createQueryString(queries) {
    // return queries.entries().reduce(
    //   (acc, query) => `${acc}&&${query[0]}=${query[1]}`,
    //   `?apiKey=${API_KEY}`
    // );
    let str = `apiKey=${API_KEY}&country=us`;
    
    for(let key in queries) {
      str = `${str}&${key}=${queries[key]}`
    }

    return str;
  }

  send() {
    return fetch(this._url).then(res => res.json());
  }
}

export default Request;
