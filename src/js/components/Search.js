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
  }

  activateSearch = () => {
    showElements("block")([this.searchInput, this.searchCloseButton]);
    this.searchWrap.classList.add("search-active");
  };

  disactivateSearch = () => {
    hideElements([this.searchInput, this.searchCloseButton]);

    this.searchWrap.classList.remove("search-active");
    this.searchButton.dataset.active = false;
    this.searchResults.innerHTML = " ";
    this.searchInput.value = "";
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
