import {render, RenderPosition} from '../render.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import EditPointView from '../view/edit-point.js';
import PointView from '../view/point.js';

export default class TravelRoutePresenter {
  constructor(filtersPosition, containerPosition, pointModel) {
    this.filtersPosition = filtersPosition;
    this.containerPosition = containerPosition;
    this.pointModel = pointModel;
  }

  init() {
    this.points = [...this.pointModel.getPoints()];
    this.offersByType = [...this.pointModel.getOffersByType()];
    render(new FilterView(), this.filtersPosition, RenderPosition.AFTERBEGIN);
    render(new SortView(), this.containerPosition, RenderPosition.AFTERBEGIN);
    render(new EditPointView(this.points[4], this.offersByType), this.containerPosition);
    this.points.forEach((point) => render(new PointView(point), this.containerPosition));
  }
}
