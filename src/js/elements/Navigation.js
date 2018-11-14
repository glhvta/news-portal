import Banner from "./Banner";
import Request from "../Request";
import TopHeadlines from "./TopHeadlines";
import { showElement } from "../utils/dom";
import { TOP_HEADLINES, COUNTRY, CATEGORY } from "../constants/request";

class Navigation {
  constructor() {
    this.node = document.getElementById("category-nav");
    this.categoryNews = document.getElementById("category-news");
    this.categoryTitle = document.getElementById("category-title");

    this.currentCategory = null;

    window.addEventListener("scroll", this.handleScroll());
    this.categoryNews.addEventListener("click", this.handleClick);
  }

  handleClick = ({ target }) => {
    if (!target.classList.contains("nav-list-item")) {
      return;
    }

    if (this.category === target.textContent) {
      return;
    }
    this.category = target.textContent;
    this.showCategory(this.category);
    this.getNews(this.category);
  };

  getNews = category => {
    new Request(TOP_HEADLINES, { [CATEGORY]: category, [COUNTRY]: "us" })
      .send()
      .then(TopHeadlines.render);
  };

  showCategory = category => {
    Banner.hide();
    showElement("block")(this.categoryTitle);
    this.categoryTitle.className = `category-title ${category}-theme`;
    this.categoryTitle.innerHTML = category;
  };

  handleScroll = e => {
    const headerHeight = this.node.clientHeight;
    let lastScrollTop = 0;
    let ticking = false;

    const hasScrolled = () => {
      const scrollTop = window.scrollY;

      if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
        this.node.classList.add("nav-hidden");
      } else {
        if (scrollTop + window.innerHeight < document.body.clientHeight) {
          this.node.classList.remove("nav-hidden");
        }
      }

      lastScrollTop = scrollTop;
    };

    return () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          hasScrolled();
          ticking = false;
        });

        ticking = true;
      }
    };
  };
}

export default Navigation;
