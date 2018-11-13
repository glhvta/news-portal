import Request from "../Request";
import { transformContent, transformDate } from '../utils/artilcle';
import { TOP_HEADLINES, COUNTRY } from "../constants/request";
import Search from "./Search";
import Banner from './Banner';

class TopHeadlines {
  constructor() {
    this.node = document.getElementById("top-headlines");
    this.getArticles();
  }

  getArticles() {
    new Request(TOP_HEADLINES, { [COUNTRY]: 'us' }).send().then(this.render);
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
          `<div class="article-image">
            <img src=${article.urlToImage} onerror='this.classList.add('image-placeholer')'/>
          </div>` : ''}
      </li>
    `, ``);
    
    Banner.setBackground(articles[0].urlToImage);
    this.node.innerHTML = `<ul class="top-headlines-container">${innerHTML}</ul>`;
  };
}

export default new TopHeadlines();
