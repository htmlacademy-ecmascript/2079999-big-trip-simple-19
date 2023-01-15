import { render, RenderPosition } from '../framework/render.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import PointView from '../view/point.js';
import PointPresenter from './point-presenter.js';
import { PointMode } from '../const.js';

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

  init() {
    render(new FilterView(), this.#filtersPosition, RenderPosition.AFTERBEGIN);
    render(new SortView(), this.#containerPosition, RenderPosition.AFTERBEGIN);
    if (!this.#points || !this.#points.length) {
      render(new PointView(null), this.#containerPosition);
    } else {
      this.#points.forEach((point) => this.#renderPoint(point));
    }
  }
}
