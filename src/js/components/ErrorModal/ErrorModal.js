import { showElement, hideElement } from "utils/dom";

class ErrorModal {
  constructor() {
    this.create();

    this.node = document.getElementById("error-modal");
    this.modalContent = document.getElementById("modal-content");
    document.getElementById("modal-close").addEventListener("click", this.hide);
  }

  hide = () => {
    this.render({});

    hideElement(this.node);
  };

  show = config => {
    this.render(config);

    showElement("block")(this.node);
  };

  create() {
    const innerHTML = `
      <div class="error-modal" id="error-modal">
        <div class="modal-content" id="modal-content"></div>
        <div class="modal-close" id="modal-close">X</div>
      </div>
    `;

    document.body.insertAdjacentHTML("afterbegin", innerHTML);
  }

  render({ code = "", message = "" }) {
    const innerHTML = `
      <h1>Error occured</h1>
      <p class="error-info">Error code: ${code}</div>
      <p class="error-info">Error message: ${message}</p>
    `;

    this.modalContent.innerHTML = innerHTML;
  }
}

export default new ErrorModal();
