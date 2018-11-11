import "../css/style.css";
import CategoryNews from "./elements/CategoryNews";
import Request from "./Request";
import { TOP_HEADLINES } from "./constants/request";
import TopHeadlines from "./elements/TopHeadlines";

document.addEventListener("DOMContentLoaded", () => {
  const categoryNews = new CategoryNews();
  const topHeadlines = new TopHeadlines();
});
