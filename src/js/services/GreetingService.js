import Notification from "components/Notification";

class GreetingService {
  constructor() {
    this.greetingsQuestions = startGreetingFlow();
  }

  start = () => {
    Notification.create({
      message: this.greetingsQuestions.next().value,
      showInput: true
    })
      .show(5000)
      .then(this.showNotificationsGuide);
  };

  showNotificationsGuide = currNotification => {
    const button = document.body.querySelector(
      ".notification-input-submit-btn"
    );

    button.addEventListener("click", () => {
      currNotification.hide(1000);

      const inpuText = document.body.querySelector(
        ".notification-input-field"
      ).value;

      Notification.showNotificationsChain([
        { message: this.greetingsQuestions.next(inpuText).value },
        { message: this.greetingsQuestions.next().value }
      ]);
    });
  };
}

function* startGreetingFlow() {
  const name = yield "Let's get acquainted! What is your name?";

  yield `Hi, ${name}! Nice to meet you!`;
  yield "Explore the website!\n In the navigation above you\n can choose a category you want to read news about";
}

export default new GreetingService().start;
