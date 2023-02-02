import { render, RenderPosition } from '../framework/render.js';
import FilterView from '../view/filter.js';

export default class FilterPresenter {
  #filtersPosition = null;
  #filterModel = null;
  #travelRoutePresenter = null;

  constructor(filtersPosition, filterModel, travelRoutePresenter) {
    this.#filtersPosition = filtersPosition;
    this.#filterModel = filterModel;
    this.#travelRoutePresenter = travelRoutePresenter;
  }

  #setFilter = (value) => {
    this.#filterModel.filter = value;
    this.#travelRoutePresenter.renderPoints();
  };

  init() {
    render(new FilterView(this.#setFilter), this.#filtersPosition, RenderPosition.AFTERBEGIN);
  }
}
