import { API_KEY, TOP_HEADLINES, EVERYTHING } from "constants/request";

const REQUEST_ENDPOINTS = {
  [TOP_HEADLINES]: "https://newsapi.org/v2/top-headlines",
  [EVERYTHING]: "https://newsapi.org/v2/everything"
};

class Request {
  constructor(type) {
    this.type = type;
  }

  createRequestUrl(queries) {
    const queryString = this.createQueryString(queries);

    this._url = `${REQUEST_ENDPOINTS[this.type]}?${queryString}`;
  }

  createQueryString(queries) {
    let str = `apiKey=${API_KEY}&language=en`;

    for (let key in queries) {
      str = `${str}&${key}=${queries[key]}`;
    }

    return str;
  }

  fetch() {
    return fetch(this._url).then(res => res.json());
  }

  async sendRequest() {
    try {
      const articles = await this.fetch();

      if (articles.status !== "ok") {
        this.handleError(articles);
      }
      return articles;
    } catch (e) {
      console.log("Error occured while getting articles ", e);
    }
  }
}

export default Request;