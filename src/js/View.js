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
    this.navigation.render();
  }

  renderTopHeadlines = articles => {
    this.topHeadlines.render(articles);
  };
}

export default DOMView;
