import { render } from '../framework/render.js';
import PointView from '../view/point.js';
import EditPointView from '../view/edit-point.js';
import { isEscape } from '../utils.js';
import { PointMode } from '../const.js';

export default class PointPresenter {
  #point = null;
  #position = null;
  #model = null;
  #pointView = null;
  #editView = null;
  #closeOpenedPointsHandler = null;
  #pointMode = PointMode.CLOSED;

  constructor(point, position, model, closeOpenedPoints) {
    this.#point = point;
    this.#position = position;
    this.#model = model;
    this.#closeOpenedPointsHandler = closeOpenedPoints;
  }

  #escKeydownHandler = (evt) => {
    if (isEscape(evt)) {
      this.closePoint();
    }
  };

  closePoint = () => {
    render(this.#pointView, this.#position);
    this.#position.replaceChild(this.#pointView.element, this.#editView.element);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#pointMode = PointMode.CLOSED;
  };

  openPoint = () => {
    this.#closeOpenedPointsHandler();
    render(this.#editView, this.#position);
    this.#position.replaceChild(this.#editView.element, this.#pointView.element);
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#pointMode = PointMode.OPENED;
  };

  getPointMode() {
    return this.#pointMode;
  }

  getEventPrice() {
    return this.#point.basePrice;
  }

  getElement() {
    return this.#pointView.element;
  }

  getPointView() {
    return this.#pointView;
  }

  getEventDate() {
    return this.#point.dateFrom;
  }

  init() {
    this.#pointView = new PointView(this.#point, this.openPoint);
    this.#editView = new EditPointView(this.#point, this.#model.offersByTypes, this.closePoint);
    render(this.#pointView, this.#position);
  }
}
