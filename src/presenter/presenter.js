import {render, RenderPosition} from '../render.js';
import NewFiltersView from '../view/filters.js';
import NewSortView from '../view/sort.js';
import NewAddPointFormView from '../view/add-point-form.js';
import NewEditPointFormView from '../view/edit-point-form.js';
import NewPointView from '../view/point.js';

const filtersPosition = document.querySelector('.trip-controls__filters');
const containerPosition = document.querySelector('.trip-events');

export default class Presenter {
  init() {
    render(new NewFiltersView(), filtersPosition, RenderPosition.AFTERBEGIN);
    render(new NewSortView(), containerPosition, RenderPosition.AFTERBEGIN);
    render(new NewEditPointFormView(), containerPosition, RenderPosition.BEFOREEND);
    for (let i = 0; i < 3; i++) {
      render(new NewPointView(), containerPosition, RenderPosition.BEFOREEND);
    }
    render(new NewAddPointFormView(), containerPosition, RenderPosition.BEFOREEND);
  }
}
