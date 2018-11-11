import Request from "../Request";
import { TOP_HEADLINES } from "../constants/request";
import Banner from "./Banner";
import TopHeadlines from "./TopHeadlines";

class Navigation {
  constructor() {
    this.node = document.getElementById("category-nav");
    this.categoryNews = document.getElementById("category-news");

    window.addEventListener("scroll", this.handleScroll());
    this.categoryNews.addEventListener("click", this.getNews);
  }

  getNews = e => {
    if (!e.target.classList.contains("nav-list-item")) {
      return;
    }
    const category = e.target.textContent;

    new Request(TOP_HEADLINES, { category }).send().then(res => {
      Banner.hide();
      TopHeadlines.render(res);
    });
  };

  handleScroll = e => {
    const headerHeight = 40;
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
