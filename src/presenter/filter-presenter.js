import { render, RenderPosition } from '../framework/render.js';
import FilterView from '../view/filter.js';

export default class FilterPresenter {
  #filtersPosition = null;
  #filterModel = null;

  constructor(filtersPosition, filterModel) {
    this.#filtersPosition = filtersPosition;
    this.#filterModel = filterModel;
  }

  #setFilter = (value) => {
    this.#filterModel.setFilter(value);
  };

  init() {
    render(new FilterView(this.#setFilter), this.#filtersPosition, RenderPosition.AFTERBEGIN);
  }
}
