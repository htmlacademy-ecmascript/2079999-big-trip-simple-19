import { render, replace } from '../framework/render.js';
import PointView from '../view/point.js';
import EditPointView from '../view/edit-point.js';
import { isEscape } from '../utils.js';
import { PointMode } from '../const.js';

export default class PointPresenter {
  #point = null;
  #position = null;
  #pointOffersByType = null;
  #pointView = null;
  #editView = null;
  #closeOpenedPointsHandler = null;
  #pointMode = PointMode.CLOSED;

  constructor(point, position, pointOffersByType, closeOpenedPoints) {
    this.#point = point;
    this.#position = position;
    this.#pointOffersByType = pointOffersByType;
    this.#closeOpenedPointsHandler = closeOpenedPoints;
  }

  #escKeydownHandler = (evt) => {
    if (isEscape(evt)) {
      this.closePoint();
    }
  };

  closePoint = () => {
    render(this.#pointView, this.#position);
    replace(this.#pointView, this.#editView);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#pointMode = PointMode.CLOSED;
  };

  openPoint = () => {
    this.#closeOpenedPointsHandler();
    render(this.#editView, this.#position);
    replace(this.#editView, this.#pointView);
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

  getEventDate() {
    return this.#point.dateFrom;
  }

  init() {
    this.#pointView = new PointView(this.#point, this.openPoint);
    this.#editView = new EditPointView(this.#point, this.#pointOffersByType, this.closePoint);
    render(this.#pointView, this.#position);
  }
}
