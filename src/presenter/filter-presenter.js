import { render, RenderPosition } from '../framework/render.js';
import FilterView from '../view/filter.js';

export default class FilterPresenter {
  #filtersPosition = null;

  constructor(filtersPosition) {
    this.#filtersPosition = filtersPosition;
  }

  init() {
    render(new FilterView(), this.#filtersPosition, RenderPosition.AFTERBEGIN);
  }
}
