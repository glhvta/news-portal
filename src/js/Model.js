const initialState = {
  topHeadlines: [],
  categoryNews: {}
};

class DOMModel {
  constructor(state = initialState) {
    this.state = state;
  }

  setTopHeadlines(articles) {
    this.state.topHeadlines = articles;
  }
}

export default DOMModel;
