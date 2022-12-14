import {getRandomElem} from '../util.js';

const pointDestinations = ['Uluvatu', 'Ubud', 'Monkey Forest', 'Denpasar', 'Batur Vulcano', 'Rice Terrain', 'Seminyak'];
const descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.','Cras aliquet varius magna, non porta ligula feugiat eget.','Fusce tristique felis at fermentum pharetra.','Aliquam id orci ut lectus varius viverra.','Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'];

const destination = [{
  id: 1,
  description: getRandomElem(descriptions),
  name: getRandomElem(pointDestinations),
  pictures: [
    {
      src: `http://picsum.photos/300/200?r=${Math.random}`,
      description: getRandomElem(descriptions)
    }
  ]
}];

export {destination};
