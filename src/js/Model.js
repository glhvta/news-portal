const initialState = {
  articles: []
};

class DOMModel {
  constructor(state = initialState) {
    this.state = state;
  }

  setArticles(articles) {
    this.state.articles = articles;
    return articles;
  }
}

export default DOMModel;
