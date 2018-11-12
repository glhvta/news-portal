import { TOP_HEADLINES } from "../constants/request";
import Request from "../Request";
import { transformContent, transformDate } from '../utils/artilcle';

class TopHeadlines {
  constructor() {
    this.node = document.getElementById("top-headlines");
    this.getArticles();
  }

  getArticles() {
    new Request(TOP_HEADLINES).send().then(this.render);
  }

  render = ({ articles }) => {
    const innerHTML = articles.reduce((acc, article, i) => acc + `
      <li class="top-headlines-item">
        <div class="top-article-text">
          <a class="article-title" href='${article.url}' target="_blank">
            ${article.title || ''}
          </a>
          <p class="article-description">${article.description || ''}</p>
          <p class="article-description">${transformContent(article.content)}</p>
          <p class="article-date">${transformDate(article.publishedAt)}</p>
        </div>
        ${i % 3 === 0 ?
          `<div class="top-article-image">
            <img src=${article.urlToImage} onerror='this.classList.add('image-placeholer')'/>
          </div>` : ''}
      </li>
    `, ``);

    this.node.innerHTML = `<ul class="top-headlines-container">${innerHTML}</ul>`;
  };
}

export default new TopHeadlines();
