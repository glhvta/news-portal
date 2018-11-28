import Request from "../services/Request";
import Article from "./Article";
import startGreetingNotification from '../services/GreetingService';
import { setBannerBackground } from "./App";
import { EVERYTHING, Q } from "../constants/request";

class TopHeadlines {
  constructor() {
    this.node = document.getElementById("top-headlines");
    this.getArticles();
  }

  getArticles = async () => {
    try {
      const articles = await Request.from(EVERYTHING, {
        [Q]: 'top-news'
      }).send();

      this.render(articles);
      startGreetingNotification();
    } catch (e) {
      console.log("Error occured while getting articles ", e);
    }
  };

  render = ({ articles }) => {
    const innerHTML = articles.reduce(
      (acc, article) => acc + Article(article),
      ``
    );

    setBannerBackground(articles[0].urlToImage);
    this.node.innerHTML = `<ul class='top-articles-container'>${innerHTML}</ul>`;
  };
}

export default new TopHeadlines();
