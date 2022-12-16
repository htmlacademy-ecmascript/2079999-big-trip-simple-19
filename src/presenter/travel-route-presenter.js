import {render, RenderPosition} from '../render.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import AddPointView from '../view/add-point.js';
// import EditPointView from '../view/edit-point.js';
import PointView from '../view/point.js';
import { getRandomElem } from '../util.js';
const POINTS_COUNT = 3;

export default class TravelRoutePresenter {
  constructor(filtersPosition, containerPosition, pointModel) {
    this.filtersPosition = filtersPosition;
    this.containerPosition = containerPosition;
    this.pointModel = pointModel;
  }

  init() {
    this.points = [...this.pointModel.getPoints()];
    render(new FilterView(), this.filtersPosition, RenderPosition.AFTERBEGIN);
    render(new SortView(), this.containerPosition, RenderPosition.AFTERBEGIN);
    render(new AddPointView(), this.containerPosition, RenderPosition.BEFOREEND);
    // render(new EditPointView(), this.containerPosition, RenderPosition.BEFOREEND);
    for (let i = 0; i < POINTS_COUNT; i++) {
      render(new PointView(getRandomElem(this.points)), this.containerPosition, RenderPosition.BEFOREEND);
    }
  }
}
