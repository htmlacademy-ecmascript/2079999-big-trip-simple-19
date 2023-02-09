import TravelRoutePresenter from './presenter/travel-route-presenter.js';
import PointModel from './model/travel-route-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import PointApiService from './points-api-service.js';

const filtersPositionElement = document.querySelector('.trip-controls__filters');
const contentContainerElement = document.querySelector('.trip-events');

const URL = 'https://19.ecmascript.pages.academy/big-trip-simple';
const TOKEN = 'Basic u834u3r32212d3';

const pointsApiService = new PointApiService(URL, TOKEN);
const pointModel = new PointModel(pointsApiService);


pointModel.init().then(() => {
  const filterModel = new FilterModel();
  const travelRoutePresenter = new TravelRoutePresenter(contentContainerElement, pointModel, filterModel);
  const filterPresenter = new FilterPresenter(filtersPositionElement, filterModel, travelRoutePresenter);
  travelRoutePresenter.init();
  filterPresenter.init();
});
