import { render, RenderPosition } from '../framework/render.js';
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

  #createPoint(pointData) {
    const pointPresenter = new PointPresenter(pointData, this.#pointsContainer.element, this.#pointModel.offersByTypes, this.closeOpenedPoints);
    this.#renderedPoints.push(pointPresenter);
    pointPresenter.init();
  }

  closeOpenedPoints = () => {
    this.#renderedPoints.forEach((point) => point.getPointMode() === PointMode.OPENED ? point.closePoint() : '');
  };

  #sortPointsByPrice = () => {
    this.#pointsContainer.element.innerHTML = '';
    this.#points.sort((a, b) => ((a['basePrice'] > b['basePrice']) ? -1 : 0));
    this.#points.forEach((pointData) => this.#createPoint(pointData));
  };

  #sortPointsByDate = () => {
    this.#pointsContainer.element.innerHTML = '';
    this.#points.sort((a, b) => ((formatDateForSort(a['dateFrom']) > formatDateForSort(b['dateFrom'])) ? -1 : 0));
    this.#points.forEach((pointData) => this.#createPoint(pointData));
  };

  init() {
    render(new FilterView(), this.#filtersPosition, RenderPosition.AFTERBEGIN);
    render(new SortView(this.#sortPointsByPrice, this.#sortPointsByDate), this.#contentContainer, RenderPosition.AFTERBEGIN);
    if (!this.#points || !this.#points.length) {
      render(new EmptyPointListView(), this.#contentContainer);
    } else {
      render(this.#pointsContainer, this.#contentContainer);
      this.#sortPointsByDate();
    }
  }
}
