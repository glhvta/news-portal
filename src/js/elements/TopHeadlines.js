import { TOP_HEADLINES } from "../constants/request";
import Request from "../Request";

class TopHeadlines {
  constructor() {
    this.node = document.getElementById("top-headlines");
    this.getArticles();
  }

  getArticles() {
    new Request(TOP_HEADLINES).send().then(this.render);
  }

  render = ({ articles }) => {
    console.log(articles);
    const innerHTML = articles.reduce((acc, article, i) => acc + `
      <li class="top-headlines-item">
        <div class="top-article-text">
          <a class="article-title" href='${article.url}' target="_blank">${article.title}</a>
          <p class="article-description">${article.description}</p>
          <p class="article-description">${article.content}</p>
          <p class="article-date">${article.publishedAt}</p>
        </div>
        ${i % 3 === 0 ? 
          `<div class="top-article-image">
            <img src=${article.urlToImage} onerror='console.log(this)'/>
          </div>` : ''}
      </li>
    `, ``);

    this.node.insertAdjacentHTML(
      "beforeend",
      `<ul class="top-headlines-container">${innerHTML}</ul>`
    );
  }
}

export default TopHeadlines;
