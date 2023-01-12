import { render, RenderPosition } from '../framework/render.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import EditPointView from '../view/edit-point.js';
import PointView from '../view/point.js';
import { isEscape } from '../utils.js';

export default class TravelRoutePresenter {
  #filtersPosition = null;
  #containerPosition = null;
  #pointModel = null;
  #points = null;
  #offersByType = null;

  constructor(filtersPosition, containerPosition, pointModel) {
    this.#filtersPosition = filtersPosition;
    this.#containerPosition = containerPosition;
    this.#pointModel = pointModel;
  }

  #renderPoint(point) {
    const pointView = new PointView(point, openFormHandler.bind(this));
    const editView = new EditPointView(point, this.#offersByType, closeFormHandler.bind(this));

    const escKeydownHandler = (evt) => {
      if (isEscape(evt)) {
        closeFormHandler(evt);
      }
    };

    function closeFormHandler(evt) {
      evt.preventDefault();
      render(pointView, this.#containerPosition);
      this.#containerPosition.replaceChild(pointView.element, editView.element);
      document.removeEventListener('keydown', escKeydownHandler);
    }

    function openFormHandler() {
      render(editView, this.#containerPosition);
      this.#containerPosition.replaceChild(editView.element, pointView.element);
      document.addEventListener('keydown', escKeydownHandler);
    }

    render(pointView, this.#containerPosition);
  }

  init() {
    this.#points = [...this.#pointModel.points];
    this.#offersByType = [...this.#pointModel.offersByType];
    render(new FilterView(), this.#filtersPosition, RenderPosition.AFTERBEGIN);
    render(new SortView(), this.#containerPosition, RenderPosition.AFTERBEGIN);
    if (!this.#points || !this.#points.length) {
      render(new PointView(null), this.#containerPosition);
    } else {
      this.#points.forEach((point) => this.#renderPoint(point));
    }
  }
}
