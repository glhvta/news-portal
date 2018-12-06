import { wait } from "utils/timers";

class Notification {
  constructor(settings) {
    this._node = null;
    this.settings = settings;

    this._render();
  }

  static create(settings = {}) {
    return new Notification(settings);
  }

  static showNotificationsChain(notificationsSettings) {
    notificationsSettings.reduce((promise, settings) => {
      return promise
        .then(() => Notification.create(settings).show(2000))
        .then(notification => notification.hide(5000));
    }, Promise.resolve());
  }

  _renderInput = () => {
    const baseClass = "notification-input";

    return `
      <div class='${baseClass}-wrapper'>
        <input type="text" class='${baseClass}-field'>
        <button class='${baseClass}-submit-btn'>
          ОК
        </button>
      </div>
    `;
  };

  _render = () => {
    const { message, showInput } = this.settings;
    const baseClass = "notification";

    this._node = document.createElement("div");
    this._node.classList.add(baseClass);

    const innerHTML = `
      <p class='${baseClass}-message'>${message}</p>
      ${showInput ? this._renderInput() : ''}
    `;

    this._node.insertAdjacentHTML("afterbegin", innerHTML);
    document.body.insertAdjacentElement("afterbegin", this._node);
  };

  show = ms => {
    return wait(ms).then(() => {
      this._node.classList.add(`notification-visible`);
      return this;
    });
  };

  hide = (ms) => {
    return wait(ms).then(() => {
      this._node.classList.remove(`notification-visible`);
      return this;
    });
  };
}

export default Notification;
