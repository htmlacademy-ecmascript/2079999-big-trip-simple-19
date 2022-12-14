import {render, RenderPosition} from '../render.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import AddPointView from '../view/add-point.js';
import EditPointView from '../view/edit-point.js';
import PointView from '../view/point.js';

const filtersPosition = document.querySelector('.trip-controls__filters');
const containerPosition = document.querySelector('.trip-events');

export default class TravelRoutePresenter {
  init() {
    render(new FilterView(), filtersPosition, RenderPosition.AFTERBEGIN);
    render(new SortView(), containerPosition, RenderPosition.AFTERBEGIN);
    render(new EditPointView(), containerPosition, RenderPosition.BEFOREEND);
    for (let i = 0; i < 3; i++) {
      render(new PointView(), containerPosition, RenderPosition.BEFOREEND);
    }
    render(new AddPointView(), containerPosition, RenderPosition.BEFOREEND);
  }
}
