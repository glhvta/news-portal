import { showElement, hideElement } from "../utils/dom";

class Banner {
  constructor() {
    this.node = document.getElementById("banner");
  }

  hide = () => hideElement(this.node);

  show = () => showElement("block")(this.node);

  setBackground = url => {
    this.node.style.backgroundImage = `url(${url})`;
  };
}

export default new Banner();
