import Request from "services/RequestService/RequestFactory";
import { EVERYTHING, TOP_HEADLINES } from "constants/request";
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

  fetchInitialNews = () => {
    Request.create(EVERYTHING)
      .fetchArticles("top-news")
      .then(articles => {
        if (articles) {
          const topHeadlines = this.model.setArticles(articles);
          this.view.renderTopHeadlines(topHeadlines);
        }
      });
  };

  fetchCategoryNews = category => {
    Request.create(TOP_HEADLINES)
      .fetchArticlesByCategory(category)
      .then(articles => {
        if (articles) {
          const categoryNews = this.model.setArticles(articles);
          this.view.renderTopHeadlines(categoryNews);
        }
      });
  };

  searchNews = inputText => {
    Request.create(EVERYTHING)
      .fetchArticles(inputText)
      .then(articles => {
        if (articles) {
          const searchResults = this.model.setSearchResults(articles);
          this.view.search.render(searchResults);
        }
      });
  };
}

export default Controller;
