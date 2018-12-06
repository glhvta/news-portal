import Article from "./Article";

class TopHeadlines {
  constructor() {
    this.node = document.getElementById("top-headlines");
  }

  render = ({ articles }) => {
    const innerHTML = articles.reduce(
      (acc, article) => acc + Article(article),
      ``
    );

    this.node.innerHTML = `<ul class='top-articles-container'>${innerHTML}</ul>`;
  };
}

export default new TopHeadlines();
