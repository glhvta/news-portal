import {
  Q,
  COUNTRY,
  CATEGORY,
  EVERYTHING,
  TOP_HEADLINES
} from "constants/request";
import Request from "./Request";

class EverythingRequest extends Request {
  constructor() {
    super(EVERYTHING);
  }

  fetchArticles(text) {
    this.createRequestUrl({ [Q]: text });

    return Promise.resolve().then(() => this.sendRequest());
  }
}

class TopHeadlinesRequest extends Request {
  constructor() {
    super(TOP_HEADLINES);
  }

  fetchArticles(text) {
    this.createRequestUrl({ [Q]: text, [COUNTRY]: "us" });

    return Promise.resolve().then(() => this.sendRequest());
  }

  fetchArticlesByCategory(text) {
    this.createRequestUrl({ [CATEGORY]: text });

    return Promise.resolve().then(() => this.sendRequest());
  }
}

export default class RequestFactory {
  static create(type) {
    switch (type) {
      case TOP_HEADLINES:
        return new TopHeadlinesRequest();
      case EVERYTHING:
        return new EverythingRequest();
    }
  }
}
