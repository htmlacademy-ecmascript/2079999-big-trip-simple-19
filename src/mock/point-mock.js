import {getRandomElem} from '../util.js';

const pointTypes = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const point = {
  type: getRandomElem(pointTypes),
};

export {point};
