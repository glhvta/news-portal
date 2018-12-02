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
  //move to Requests factory
  fetchInitialNews = async () => {
    try {
      const articles = await Request.from(EVERYTHING, {
        [Q]: "top-news"
      }).send();

      const topHeadlines = this.model.setArticles(articles);
      this.view.renderTopHeadlines(topHeadlines);
    } catch (e) {
      console.log("Error occured while getting articles ", e);
    }
  };

  fetchCategoryNews = async category => {
    try {
      const articles = await Request.from(EVERYTHING, {
        [Q]: category
      }).send();

      const categoryNews = this.model.setArticles(articles);

      this.view.renderTopHeadlines(categoryNews);
    } catch (e) {
      console.log("Error occured while getting articles ", e);
    }
  };

  searchNews = async inputText => {
    try {
      const articles = await Request.from(EVERYTHING, {
        [Q]: inputText
      }).send();
      const searchResults = this.model.setSearchResults(articles);

      this.view.search.render(searchResults);
    } catch (e) {
      console.log("Error occured while getting articles ", e);
    }
  };
}

export default Controller;
