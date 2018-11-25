import "../css/index.css";

const initialize = () => {
  const button = document.getElementById("initialize-app-button");

  button.onclick = e =>
    import(/* webpackChunkName: "app" */ "./elements/App").then(module => {
      button.remove();
    });
}

initialize();
