import "../css/index.css";
import "../../config/loaders/example.json";

const initialize = () => {
  const button = document.getElementById("initialize-app-button");

  button.onclick = e =>
    import(/* webpackChunkName: "app" */ "./elements/App").then(module => {
      button.remove();
    });
}

initialize();
