const initialState = {
  articles: {},
  searchResults: {}
};

class DOMModel {
  constructor(state = initialState) {
    this.state = state;
  }

  setArticles(articles) {
    this.state.articles = articles;
    return articles;
  }

  setSearchResults(articles) {
    this.state.searchResults = articles;
    return articles;
  }
}

export default DOMModel;
