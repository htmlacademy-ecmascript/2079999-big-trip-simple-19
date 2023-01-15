import { render } from '../framework/render.js';
import PointView from '../view/point.js';
import EditPointView from '../view/edit-point.js';
import { isEscape } from '../utils.js';

export default class PointPresenter {
  #point = null;
  #position = null;
  #model = null;
  #pointView = null;
  #editView = null;
  #closeAllPoints = null;

  constructor(point, position, model, closeAllPoints) {
    this.#point = point;
    this.#position = position;
    this.#model = model;
    this.#closeAllPoints = closeAllPoints;
  }

  #escKeydownHandler = (evt) => {
    if (isEscape(evt)) {
      this.#closePoint();
    }
  };

  #closePoint = () => {
    render(this.#pointView, this.#position);
    this.#position.replaceChild(this.#pointView.element, this.#editView.element);
    document.removeEventListener('keydown', this.#escKeydownHandler);
  };

  #openPoint = () => {
    render(this.#editView, this.#position);
    this.#position.replaceChild(this.#editView.element, this.#pointView.element);
    document.addEventListener('keydown', this.#escKeydownHandler);
  };

  init() {
    this.#pointView = new PointView(this.#point, this.#openPoint);
    this.#editView = new EditPointView(this.#point, this.#model.offersByTypes, this.#closePoint);
    render(this.#pointView, this.#position);
  }
}
