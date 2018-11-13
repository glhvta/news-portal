class Banner {
  constructor() {
    this.node = document.getElementById("banner");
  }

  hide = () => (this.node.style.display = "none");

  show = () => (this.node.style.display = "block");

  setBackground = url => {
    this.node.style.backgroundImage = `url(${url})`
  }
}

export default new Banner();
