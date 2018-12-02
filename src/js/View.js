import "../css/app.css";
import "../css/responsive.css";
import EventEmitter from "services/EventEmitter";
import banner from "components/Banner";
import navigation from "components/Navigation";
import search from "components/Search";
import topHeadlines from "components/TopHeadlines";
import { showElement, hideElement } from "utils/dom";

class DOMView extends EventEmitter {
  constructor() {
    super();

    this.banner = banner;
    this.navigation = navigation;
    this.search = search;
    this.topHeadlines = topHeadlines;
  }

  initialize() {
    const { categoryNews } = this.navigation;
    const { searchButton, searchCloseButton } = this.search;

    searchButton.addEventListener("click", this.onSearchButtonClick);
    searchCloseButton.addEventListener("click", this.onSearchCloseButtonClick);
    categoryNews.addEventListener("click", this.onCategoryChange);
    this.navigation.render();
  }

  onCategoryChange = ({ target }) => {
    if (!target.classList.contains("nav-list-item")) {
      return;
    }

    const category = target.textContent;
    this.navigation.showCategory(category);
    this.emit("GET_CATEGORY_NEWS", category);
  };

  onSearchButtonClick = ({ target }) => {
    hideElement(this.navigation.categoryNews);
    this.search.activateSearch();
    const searchQuery = this.search.searchInput.value;

    if (!target.dataset.active) {
      target.dataset.active = true;
      return;
    }
    //unnessasary requests
    this.emit("SEARCH_NEWS", searchQuery);
  };

  onSearchCloseButtonClick = () => {
    showElement("flex")(this.navigation.categoryNews);
    this.search.disactivateSearch();
  };

  renderTopHeadlines = articles => {
    this.topHeadlines.render(articles);
  };

  renderSearchResults = articles => {
    this.search.render(articles);
  };
}

export default DOMView;
