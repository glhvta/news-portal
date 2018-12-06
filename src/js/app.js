import Model from "./Model";
import View from "./View";
import Presenter from "./Presenter";

const model = new Model();
const view = new View();
const presenter = new Presenter(view, model);
