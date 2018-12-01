import Request from "services/Request";
import { hideBanner, renderTopHeadlines } from "./App";
import { showElement } from "utils/dom";
import { EVERYTHING, Q } from "constants/request";

class Navigation {
  constructor() {
    this._node = document.getElementById("category-nav");
    this._categoryNews = document.getElementById("category-news");
    this._categoryTitle = document.getElementById("category-title");

    this.category = null;

    window.addEventListener("scroll", this.handleScroll());
    this._categoryNews.addEventListener("click", this.handleClick);
  }

  get categoryList() {
    return this._categoryNews;
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

  getNews = async category => {
    try {
      const articles = await Request.from(EVERYTHING, {
        [Q]: category,
      }).send();
      
      renderTopHeadlines(articles);
    } catch (e) {
      console.log("Error occured while getting articles ", e);
    }
  };

  showCategory = category => {
    hideBanner();
    showElement("block")(this._categoryTitle);
    this._categoryTitle.className = `category-title ${category}-theme`;
    this._categoryTitle.innerHTML = category;
  };

  handleScroll = e => {
    const headerHeight = this._node.clientHeight;
    let lastScrollTop = 0;
    let ticking = false;

    const hasScrolled = () => {
      const scrollTop = window.scrollY;

      if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
        this._node.classList.add("nav-hidden");
      } else {
        if (scrollTop + window.innerHeight < document.body.clientHeight) {
          this._node.classList.remove("nav-hidden");
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

export default new Navigation();
