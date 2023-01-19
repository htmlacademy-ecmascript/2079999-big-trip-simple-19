import { render, RenderPosition, remove } from '../framework/render.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import PointView from '../view/point.js';
import PointPresenter from './point-presenter.js';
import { PointMode } from '../const.js';
import { formatDateForSort } from '../utils.js';

export default class TravelRoutePresenter {
  #filtersPosition = null;
  #containerPosition = null;
  #pointModel = null;
  #points = null;
  #renderedPoints = [];

  constructor(filtersPosition, containerPosition, pointModel) {
    this.#filtersPosition = filtersPosition;
    this.#containerPosition = containerPosition;
    this.#pointModel = pointModel;
    this.#points = [...this.#pointModel.points];
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(point, this.#containerPosition, this.#pointModel, this.closeOpenedPoints);
    this.#renderedPoints.push(pointPresenter);
    pointPresenter.init();
  }

  closeOpenedPoints = () => {
    this.#renderedPoints.forEach((point) => point.getPointMode() === PointMode.OPENED ? point.closePoint() : '');
  };

  #sortPointsByPrice = () => {
    this.closeOpenedPoints();
    this.#renderedPoints.forEach((point) => remove(point.getPointView()));
    for (let i = 0; i < this.#renderedPoints.length - 1; i++) {
      for (let j = 0; j < this.#renderedPoints.length - 1; j++) {
        if (this.#renderedPoints[j].getEventPrice() < this.#renderedPoints[j + 1].getEventPrice()) {
          const buff = this.#renderedPoints[j];
          this.#renderedPoints[j] = this.#renderedPoints[j + 1];
          this.#renderedPoints[j + 1] = buff;
        }
      }
    }
    this.#renderedPoints.forEach((point) => point.init());
  };

  #sortPointsByDate = () => {
    this.closeOpenedPoints();
    this.#renderedPoints.forEach((point) => remove(point.getPointView()));
    for (let i = 0; i < this.#renderedPoints.length - 1; i++) {
      for (let j = 0; j < this.#renderedPoints.length - 1; j++) {
        if (formatDateForSort(this.#renderedPoints[j].getEventDate()) < formatDateForSort(this.#renderedPoints[j + 1].getEventDate())) {
          const buff = this.#renderedPoints[j];
          this.#renderedPoints[j] = this.#renderedPoints[j + 1];
          this.#renderedPoints[j + 1] = buff;
        }
      }
    }
    this.#renderedPoints.forEach((point) => point.init());
  };

  init() {
    render(new FilterView(), this.#filtersPosition, RenderPosition.AFTERBEGIN);
    render(new SortView(this.#sortPointsByPrice, this.#sortPointsByDate), this.#containerPosition, RenderPosition.AFTERBEGIN);
    if (!this.#points || !this.#points.length) {
      render(new PointView(null), this.#containerPosition);
    } else {
      this.#points.forEach((point) => this.#renderPoint(point));
    }
  }
}
