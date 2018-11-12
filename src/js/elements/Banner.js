class Banner {
  constructor() {
    this.node = document.getElementById("banner");
    this.setBackground();
  }

  hide = () => (this.node.style.display = "none");

  show = () => (this.node.style.display = "block");

  setBackground = () => {
    this.node.style.backgroundImage = `url(${'http://www.gentleleader.co.uk/wp-content/uploads/2010/03/new-york-times.jpg'})`
  }
}

export default new Banner();
