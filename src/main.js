import {getRandomPointMock, getDestinationMock, getOffersMock, getOffersByTypeMock} from './mock/travel-route-mock.js';
import TravelRoutePresenter from './presenter/travel-route-presenter.js';

const travelRoutePresenter = new TravelRoutePresenter();
travelRoutePresenter.init();

console.log(getDestinationMock());
console.log(getOffersMock());
console.log(getOffersByTypeMock());
console.log(getRandomPointMock());
