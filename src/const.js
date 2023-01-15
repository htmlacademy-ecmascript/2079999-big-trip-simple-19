import { getOffersByType } from './mock/travel-route-mock.js';

const OFFERS_TYPE = getOffersByType().map(({type}) => type);

const PointMode = {
  OPENED: 'opened',
  CLOSED: 'closed'
};

export { OFFERS_TYPE, PointMode };
