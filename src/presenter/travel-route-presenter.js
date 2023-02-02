import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort.js';
import PointPresenter from './point-presenter.js';
import { PointMode } from '../const.js';
import { formatDateForSort } from '../utils.js';
import EmptyPointListView from '../view/empty-point-list.js';
import PointContainerView from '../view/point-container.js';

export default class TravelRoutePresenter {
  #contentContainer = null;
  #pointsContainer = null;
  #pointModel = null;
  #filterModel = null;
  #points = null;
  #pointsDestinations = null;
  #renderedPoints = [];

  constructor(contentContainer, pointModel, filterModel) {
    this.#contentContainer = contentContainer;
    this.#pointsContainer = new PointContainerView();
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
    this.#points = [...this.#pointModel.filterPoints(this.#filterModel.filter)];
    this.#pointsDestinations = [...this.#pointModel.destinations];
  }

  #createPoint(pointData) {
    const pointPresenter = new PointPresenter(pointData, this.#pointsContainer.element, this.#pointModel.offersByTypes, this.closeOpenedPoints, this.#pointsDestinations);
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

  renderPoints() {
    this.#points = [...this.#pointModel.filterPoints(this.#filterModel.filter)];
    render(this.#pointsContainer, this.#contentContainer);
    this.#sortPointsByDate();
  }

  init() {
    render(new SortView(this.#sortPointsByPrice, this.#sortPointsByDate), this.#contentContainer, RenderPosition.AFTERBEGIN);
    if (!this.#points || !this.#points.length) {
      render(new EmptyPointListView(), this.#contentContainer);
    } else {
      render(this.#pointsContainer, this.#contentContainer);
      this.#sortPointsByDate();
    }
  }
}
