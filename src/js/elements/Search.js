import Request from "services/Request";
import { EVERYTHING, Q } from "constants/request";
import { CategoryList } from "./App";
import Article from "./Article";
import {
  hideElements,
  showElement,
  showElements,
  hideElement
} from "utils/dom";

class Search {
  constructor() {
    this.searchWrap = document.getElementById("search-wrap");
    this.searchInput = document.getElementById("search-input");
    this.searchButton = document.getElementById("search-btn");
    this.searchCloseButton = document.getElementById("search-close-btn");
    this.searchResults = document.getElementById("search-results");

    this.searchQuery = null;

    this.searchButton.addEventListener("click", this.handleBtnClick);
    this.searchCloseButton.addEventListener("click", this.disactivateSearch);
  }

  handleBtnClick = ({ target }) => {
    this.activateSearch();
    const searchQuery = this.searchInput.value;

    if (!target.dataset.active) {
      target.dataset.active = true;
      return;
    }

    if (this.searchQuery === searchQuery) {
      return;
    }

    this.searchQuery = searchQuery;
    this.getNews(this.searchQuery);
  };

  activateSearch = () => {
    showElements("block")([this.searchInput, this.searchCloseButton]);
    hideElement(CategoryList);
    this.searchWrap.classList.add("search-active");
  };

  disactivateSearch = () => {
    hideElements([this.searchInput, this.searchCloseButton]);
    showElement("flex")(CategoryList);

    this.searchWrap.classList.remove("search-active");
    this.searchButton.dataset.active = false;
    this.searchResults.innerHTML = " ";
    this.searchInput.value = "";
  };

  getNews = async inputText => {
    try {
      const articles = await Request.from(EVERYTHING, {
        [Q]: inputText
      }).send();

      this.render(articles);
    } catch (e) {
      console.log("Error occured while getting articles ", e);
    }
  };

  hideSearchResults = () => hideElement(this.searchResults);

  showSearchResults = () => showElement("block")(this.searchResults);

  render = ({ articles }) => {
    const innerHTML = articles.reduce(
      (acc, article) => acc + Article(article), ``
    );

    this.searchResults.innerHTML = `<ul class="articles-container">${innerHTML}</ul>`;
    this.showSearchResults();
  };
}

export default new Search();
