import { render, RenderPosition, remove } from '../framework/render.js';
import SortView from '../view/sort.js';
import PointPresenter from './point-presenter.js';
import { PointMode } from '../const.js';
import { formatDateForSort } from '../utils.js';
import EmptyPointListView from '../view/empty-point-list.js';
import PointContainerView from '../view/point-container.js';
import AddPointView from '../view/add-point.js';
import { isEscape } from '../utils.js';

export default class TravelRoutePresenter {
  #contentContainer = null;
  #pointsContainer = null;
  #pointModel = null;
  #filterModel = null;
  #points = null;
  #pointsDestinations = null;
  #renderedPoints = [];
  #addPointView = null;
  #addPointButton = null;

  constructor(contentContainer, pointModel, filterModel) {
    this.#contentContainer = contentContainer;
    this.#pointsContainer = new PointContainerView();
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
    this.#points = [...this.#pointModel.filterPoints(this.#filterModel.filter)];
    this.#pointsDestinations = [...this.#pointModel.destinations];
    document.querySelector('.trip-main__event-add-btn').addEventListener('click', this.#addPointHandler);
  }

  #escKeydownHandler = (evt) => {
    if (isEscape(evt)) {
      this.#closeAddPoint();
    }
  };

  #addPointHandler = (evt) => {
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#addPointView = new AddPointView(this.#pointsDestinations, this.#pointModel.offersByTypes, this.#closeAddPoint, this.#addPoint);
    render(this.#addPointView, this.#pointsContainer.element, RenderPosition.AFTERBEGIN);
    this.#addPointButton = evt.target;
    this.#addPointButton.disabled = true;
  };

  #closeAddPoint = () => {
    remove(this.#addPointView);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#addPointButton.disabled = false;
  };

  #addPoint = (pointData) => {
    this.#pointModel.addPoint(pointData);
    this.#renderedPoints.forEach((pointPresenter) => pointPresenter.destroy());
    this.renderPoints();
  };

  #deletePoint = (pointData) => {
    this.#pointModel.deletePoint(pointData);
    this.#renderedPoints.forEach((pointPresenter) => pointPresenter.destroy());
    this.renderPoints();
  };

  #createPoint(pointData) {
    const pointPresenter = new PointPresenter(pointData, this.#pointsContainer.element, this.#pointModel.offersByTypes, this.#closeOpenedPoints, this.#pointsDestinations, this.#deletePoint);
    this.#renderedPoints.push(pointPresenter);
    pointPresenter.init();
  }

  #closeOpenedPoints = () => {
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
    this.#sortPointsByDate();
  }

  init() {
    render(new SortView(this.#sortPointsByPrice, this.#sortPointsByDate), this.#contentContainer, RenderPosition.AFTERBEGIN);
    if (!this.#points || !this.#points.length) {
      render(new EmptyPointListView(), this.#contentContainer);
    } else {
      render(this.#pointsContainer, this.#contentContainer);
      this.renderPoints();
    }
  }
}
