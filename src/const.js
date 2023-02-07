import { getOffersByType } from './mock/travel-route-mock.js';

const OFFERS_TYPE = getOffersByType().map(({type}) => type);

const FilterValues = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const PointMode = {
  OPENED: 'opened',
  CLOSED: 'closed'
};

export { OFFERS_TYPE, FilterValues, PointMode };
