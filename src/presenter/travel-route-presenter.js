import { render, RenderPosition, remove } from '../framework/render.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import PointPresenter from './point-presenter.js';
import { PointMode } from '../const.js';
import { formatDateForSort } from '../utils.js';
import EmptyPointListView from '../view/empty-point-list.js';
import PointContainerView from '../view/point-container.js';

export default class TravelRoutePresenter {
  #filtersPosition = null;
  #contentContainer = null;
  #pointsContainer = null;
  #pointModel = null;
  #points = null;
  #renderedPoints = [];

  constructor(filtersPosition, contentContainer, pointModel) {
    this.#filtersPosition = filtersPosition;
    this.#contentContainer = contentContainer;
    this.#pointsContainer = new PointContainerView();
    this.#pointModel = pointModel;
    this.#points = [...this.#pointModel.points];
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(point, this.#pointsContainer.element, this.#pointModel, this.closeOpenedPoints);
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
    render(new SortView(this.#sortPointsByPrice, this.#sortPointsByDate), this.#contentContainer, RenderPosition.AFTERBEGIN);
    if (!this.#points || !this.#points.length) {
      render(new EmptyPointListView(), this.#contentContainer);
    } else {
      render(this.#pointsContainer, this.#contentContainer);
      this.#points.forEach((point) => this.#renderPoint(point));
    }
  }
}
