import { TOP_HEADLINES } from "../constants/request";
import Request from '../Request';

class TopHeadlines {
  constructor() {
    this._node = document.getElementById('top-headlines');
    this.getArticles();
  }

  getArticles() {
    new Request(TOP_HEADLINES)
      .send()
      .then(this.render);
  }

  render(articles) {
    const innerHTML = articles.reduce((acc, article) => acc + `
      <li class="top-headlines-item">
        <div class="article-content">
          <a href='${article.url}' target="_blank">${article.title}</a>
          <p>${article.description}</p>
          <p>${article.content}</p>
          <p>${article.publishedAt}</p>
        </div>
        <div class="article-image">
          <img src=${article.urlToImage}/>
        </div>
      </li>
    `, ``);

    this._node.insertAdjacentHTML('beforeend', `<ul class="top-headlines-container">${innerHTML}</ul>`);
  }
}

export default TopHeadlines;