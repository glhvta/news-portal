import "../css/index.css";

const initialize = () => {
  const button = document.getElementById("initialize-app-button");

  button.onclick = e =>
    import(/* webpackChunkName: "app" */ "./app").then(module => {
      button.remove();
    });
}

initialize();
