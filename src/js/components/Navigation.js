import { showElement } from "utils/dom";

const navConfig = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology"
];

class Navigation {
  constructor() {
    this._node = document.getElementById("category-nav");
    this.categoryNews = document.getElementById("category-news");
    this._categoryTitle = document.getElementById("category-title");

    window.addEventListener("scroll", this.handleScroll());
  }

  showCategory = category => {
    showElement("block")(this._categoryTitle);
    this._categoryTitle.className = `category-title ${category}-theme`;
    this._categoryTitle.innerHTML = category;
  };

  render(config = navConfig) {
    const innerHTML =  config.map(item => `
      <li class="nav-list-item">${item}</li>
    `).join('');

    this.categoryNews.innerHTML = innerHTML;
  }

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
