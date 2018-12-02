import "../css/app.css";
import "../css/responsive.css";
import EventEmitter from "services/EventEmitter";
import banner from "components/Banner";
import navigation from "components/Navigation";
import search from "components/Search";
import topHeadlines from "components/TopHeadlines";

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

  renderTopHeadlines = articles => {
    this.topHeadlines.render(articles);
  };
}

export default DOMView;
