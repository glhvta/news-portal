import { transformContent, transformDate } from "../utils/artilcle";

const Article = ({
  title,
  url,
  description,
  content,
  publishedAt,
  urlToImage
}) => {
  return `<li class="article-item">
    <div class="article-text">
      <a class="article-title" href='${url}' target="_blank">
        ${title || ""}
      </a>
      <p class="article-description">${description || ""}</p>
      <p class="article-description">${transformContent(content)}</p>
      <p class="article-date">${transformDate(publishedAt)}</p>
    </div>
      ${
        urlToImage
          ? `<a class="article-image"  href='${url}'>
        <img src=${urlToImage} onerror="this.style.display='none'"/>
      </a> `
          : ""
      }
  </li>
`;
};

export default Article;
