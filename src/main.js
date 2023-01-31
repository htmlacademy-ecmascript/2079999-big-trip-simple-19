import TravelRoutePresenter from './presenter/travel-route-presenter.js';
import PointModel from './model/travel-route-model.js';
import { getPoints, getDestinations, getOffers, getOffersByType } from './mock/travel-route-mock.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

const filtersPosition = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

const points = getPoints();
const destinations = getDestinations();
const offers = getOffers();
const offersByType = getOffersByType();

const pointModel = new PointModel({points, destinations, offers, offersByType});
const filterModel = new FilterModel();
const travelRoutePresenter = new TravelRoutePresenter(contentContainer, pointModel);
const filterPresenter = new FilterPresenter(filtersPosition, filterModel);
travelRoutePresenter.init();
filterPresenter.init();
