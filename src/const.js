import { getOffersByType } from './mock/travel-route-mock.js';

const OFFERS_TYPE = getOffersByType().map(({type}) => type);

export { OFFERS_TYPE };
