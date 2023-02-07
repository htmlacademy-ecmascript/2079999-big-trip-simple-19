import TravelRoutePresenter from './presenter/travel-route-presenter.js';
import PointModel from './model/travel-route-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import PointApiService from './network.js';

const filtersPosition = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

const URL = 'https://19.ecmascript.pages.academy/big-trip-simple';
const TOKEN = 'Basic u834u3r32j';

const pointsApiService = new PointApiService(URL, TOKEN);
const pointModel = new PointModel(pointsApiService);


pointModel.init().then(() => {
  const filterModel = new FilterModel();
  const travelRoutePresenter = new TravelRoutePresenter(contentContainer, pointModel, filterModel);
  const filterPresenter = new FilterPresenter(filtersPosition, filterModel, travelRoutePresenter);
  travelRoutePresenter.init();
  filterPresenter.init();
});

