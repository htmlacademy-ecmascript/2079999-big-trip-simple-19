import { render, replace } from '../framework/render.js';
import PointView from '../view/point.js';
import EditPointView from '../view/edit-point.js';
import { isEscape } from '../utils.js';
import { PointMode } from '../const.js';

export default class PointPresenter {
  #point = null;
  #pointsDestinations = null;
  #position = null;
  #pointOffersByType = null;
  #pointView = null;
  #editView = null;
  #closeOpenedPointsHandler = null;
  #pointMode = PointMode.CLOSED;
  #deletePoint = null;
  #updatePoint = null;

  constructor(point, position, pointOffersByType, closeOpenedPoints, pointsDestinations, deletePoint, updatePoint) {
    this.#point = point;
    this.#pointsDestinations = pointsDestinations;
    this.#position = position;
    this.#pointOffersByType = pointOffersByType;
    this.#closeOpenedPointsHandler = closeOpenedPoints;
    this.#deletePoint = deletePoint;
    this.#updatePoint = updatePoint;
  }

  getPointMode() {
    return this.#pointMode;
  }

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

  destroy() {
    this.#pointView.removeElement();
    this.#editView.removeElement();
  }

  init() {
    this.#pointView = new PointView(this.#point, this.openPoint);
    this.#editView = new EditPointView(this.#point, this.#pointOffersByType, this.closePoint, this.#pointsDestinations, this.#deletePoint, this.#updatePoint);
    render(this.#pointView, this.#position);
  }

  #escKeydownHandler = (evt) => {
    if (isEscape(evt)) {
      this.closePoint();
    }
  };
}
