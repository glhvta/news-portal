import Request from "services/Request";
import { EVERYTHING, Q } from "constants/request";
import { forEach } from "utils/helpers";

class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.configureEvents();
    this.initialize();
  }

  initialize() {
    this.view.initialize();
    this.fetchInitialNews();
  }

  configureEvents() {
    const config = {
      GET_CATEGORY_NEWS: this.fetchCategoryNews,
      SEARCH_NEWS: this.searchNews
    };

    forEach(config, (event, callback) => {
      this.view.on(event, callback);
    });
  }

  fetchInitialNews = async () => {
    try {
      const articles = await Request.from(EVERYTHING, {
        [Q]: "top-news"
      }).send();

      this.view.renderTopHeadlines(articles);
    } catch (e) {
      console.log("Error occured while getting articles ", e);
    }
  };
}

export default Controller;
