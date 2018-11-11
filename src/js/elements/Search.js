import { Request } from "../Request";
import { EVERYTHING } from "../constants/request";
import { ShowResults } from "./SearchResults";

class Search {
  constructor() {
    this._searchInput = document.getElementById("search-input");
    this._searchButton = document.getElementById("search-btn");
    this._searchResults = document.getElementById('search-results');

    this._searchButton.addEventListener("click", this.getNews);
  }

  getNews = e => {
    const inputText = this._searchInput.value;
    console.log("input value", inputText);

    new Request(EVERYTHING, { q: inputText })
      .send()
      .then(ShowResults.render)
  }

  render(articles) {
    const innerHTML = articles.reduce((acc, article) => acc + `
      <li class="search-results">
        <div class="article-content">
          <a href='${article.url}' target="_blank">${article.title}</a>
          <p>${article.description}</p>
          <p>${article.content}</p>
          <p>${article.publishedAt}</p>
        </div>
        <div class="article-image">
          <img src=${article.urlToImage}/>
        </div>
      </li>
    `, ``);

    SearchResults.node.insertAdjacentHTML('beforeend', `<ul class="top-headlines-container">${innerHTML}</ul>`);
  }
}

export default Search;
