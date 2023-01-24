import TravelRoutePresenter from './presenter/travel-route-presenter.js';
import PointModel from './model/travel-route-model.js';
import { getPoints, getDestinations, getOffers, getOffersByType } from './mock/travel-route-mock.js';

const filtersPosition = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

const points = getPoints();
const destinations = getDestinations();
const offers = getOffers();
const offersByType = getOffersByType();

const pointModel = new PointModel({points, destinations, offers, offersByType});
const travelRoutePresenter = new TravelRoutePresenter(filtersPosition, contentContainer, pointModel);
travelRoutePresenter.init();
