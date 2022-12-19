import TravelRoutePresenter from './presenter/travel-route-presenter.js';
import PointModel from './model/travel-route-model.js';
import { getPointMock, getDestinationMock, getOffersMock } from './mock/travel-route-mock.js';

const filtersPosition = document.querySelector('.trip-controls__filters');
const containerPosition = document.querySelector('.trip-events');

const points = getPointMock();
const destinations = getDestinationMock();
const offers = getOffersMock();

const pointModel = new PointModel({points, destinations, offers});
const travelRoutePresenter = new TravelRoutePresenter(filtersPosition, containerPosition, pointModel);
travelRoutePresenter.init();
