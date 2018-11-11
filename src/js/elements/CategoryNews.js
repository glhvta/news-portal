import Request from "../Request";
import { TOP_HEADLINES } from "../constants/request";

class CategoryNews {
  constructor() {
    this._node = document.getElementById("category-news");

    this._node.addEventListener("click", this.handleClick);
  }

  handleClick = e => {
    if (!e.target.classList.contains("nav-list-item")) {
      return;
    }
    const category = e.target.textContent;
    new Request(TOP_HEADLINES, { category }).send().then(console.log);
  }
}

export default CategoryNews;
