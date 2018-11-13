import Request from "../Request";
import { EVERYTHING, Q } from "../constants/request";
import { transformContent, transformDate } from "../utils/artilcle";
import {
  hideElements,
  showElement,
  showElements,
  hideElement
} from "../utils/dom";

class Search {
  constructor() {
    this.searchWrap = document.getElementById("search-wrap");
    this.searchInput = document.getElementById("search-input");
    this.searchButton = document.getElementById("search-btn");
    this.searchCloseButton = document.getElementById("search-close-btn");
    this.searchResults = document.getElementById("search-results");

    this.searchButton.addEventListener("click", this.handleBtnClick);
    this.searchCloseButton.addEventListener("click", this.disactivateSearch);
  }

  handleBtnClick = ({ target }) => {
    this.activateSearch();

    if (!target.dataset.active) {
      target.dataset.active = true;
      return;
    }

    this.getNews(this.searchInput.value);
  };

  activateSearch = () => {
    showElements("block")([this.searchInput, this.searchCloseButton]);
    hideElement(document.getElementById("category-news"));
    this.searchWrap.classList.add("search-active");
  };

  disactivateSearch = () => {
    hideElements([this.searchInput, this.searchCloseButton]);
    showElement("flex")(document.getElementById("category-news"));
    this.searchWrap.classList.remove("search-active");
    this.searchButton.dataset.active = false;
    this.searchResults.innerHTML = " ";
    this.searchInput.value = "";
  };

  getNews = inputText => {
    new Request(EVERYTHING, { [Q]: inputText }).send().then(this.render);
  };

  hideSearchResults = () => hideElement(this.searchResults);

  showSearchResults = () => showElement("block")(this.searchResults);

  render = ({ articles }) => {
    const innerHTML = articles.reduce((acc, article, i) => acc + `
      <li class="search-results-item">
        <div class="search-article-text">
          <a class="article-title" href='${article.url}' target="_blank">
            ${article.title || ''}
          </a>
          <p class="article-description">${article.description || ''}</p>
          <p class="article-description">${transformContent(article.content)}</p>
          <p class="article-date">${transformDate(article.publishedAt)}</p>
        </div>
        <div class="article-image">
          <img src=${article.urlToImage} onerror='this.classList.add('image-placeholer')'/>
        </div>
      </li>
    `, ``);

    this.searchResults.innerHTML = `<ul class="search-results-container">${innerHTML}</ul>`;
    this.showSearchResults();
  }
}

export default new Search();
