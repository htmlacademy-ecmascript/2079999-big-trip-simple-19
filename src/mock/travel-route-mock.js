import { getRandomElement, getRandomNumber } from './util.js';

const PICTURES_DISCRIPTION = ['Very beautiful landscape.', 'Beautiful view.', 'Cool place', 'I love it.', 'Very nice'];

function getPicturesMock() {
  return ({
    src: `http://picsum.photos/300/200?r=${Math.random()}`,
    description: getRandomElement(PICTURES_DISCRIPTION)
  });
}

const destinationMock = [{
  id: 1,
  description: 'Bali is not only a mecca for surfers, where they forget about shampoo and clothes.',
  name: 'Bali',
  pictures: Array.from({length: getRandomNumber(10)}, getPicturesMock),
},
{
  id: 2,
  description: 'Mayrhofen is a town in the Zillertal (Ziller river valley) in the Austrian state of Tyrol. It is located approximately an hour from the Tyrolean capital city of Innsbruck.',
  name: 'Mayrhofen',
  pictures: Array.from({length: getRandomNumber(10)}, getPicturesMock),
},
{
  id: 3,
  description: 'Cappadocia is a historical region in Central Anatolia, Turkey. It largely is in the provinces Nevşehir, Kayseri, Aksaray, Krşehir, Sivas and Niğde.',
  name: 'Cappadocia',
  pictures: Array.from({length: getRandomNumber(10)}, getPicturesMock),
},
{
  id: 4,
  description: 'Munich is the capital and most populous city of the German state of Bavaria.',
  name: 'Munich',
  pictures: Array.from({length: getRandomNumber(10)}, getPicturesMock),
},
{
  id: 5,
  description: 'Qatar is a country in Western Asia. It occupies the small Qatar Peninsula on the northeastern coast of the Arabian Peninsula in the Middle East.',
  name: 'Qatar',
  pictures: Array.from({length: getRandomNumber(10)}, getPicturesMock),
},
{
  id: 6,
  description: 'Lloret de Mar is a Mediterranean coastal town in Catalonia, Spain.',
  name: 'Lloret de Mar',
  pictures: Array.from({length: getRandomNumber(10)}, getPicturesMock),
},
{
  id: 7,
  description: 'Venice is a city in northeastern Italy and the capital of the Veneto region. It is built on a group of 118 small islands.',
  name: 'Venice',
  pictures: Array.from({length: getRandomNumber(10)}, getPicturesMock),
}];

const offersMock = [{
  id: 1,
  title: 'Add comfort class.',
  price: 100,
},
{
  id: 2,
  title: 'Extra space.',
  price: 200,
},
{
  id: 3,
  title: 'Power bank.',
  price: 20,
},
{
  id: 4,
  title: 'Beautiful view.',
  price: 10,
},
{
  id: 5,
  title: 'Additional set of bed linen.',
  price: 40,
},
{
  id: 6,
  title: 'The place is far from the toilet.',
  price: 30,
},
{
  id: 7,
  title: 'The cure for motion sickness.',
  price: 20,
},
{
  id: 8,
  title: 'Guide services.',
  price: 300,
},
{
  id: 9,
  title: 'Personal waiter.',
  price: 200,
},
{
  id: 10,
  title: 'Without a queue.',
  price: 50,
}];

const offersByType = [{
  type: 'taxi',
  offers: [1, 2, 3]
},
{
  type: 'bus',
  offers: [2, 3, 10],
},
{
  type: 'train',
  offers: [2, 3, 4, 5, 6],
},
{
  type: 'ship',
  offers: [3, 7],
},
{
  type: 'drive',
  offers: [2, 3],
},
{
  type: 'flight',
  offers: [2, 3],
},
{
  type: 'check-in',
  offers: [5, 10],
},
{
  type: 'sightseeing',
  offers: [8, 10],
},
{
  type: 'restaurant',
  offers: [3, 4, 9, 10],
}];

function getOffersArrayMock(type) {
  const offers = offersByType[offersByType.findIndex((elem) => elem.type === type)].offers;
  const result = [];
  for (let i = 0; i < offers.length; i++) {
    if (Math.random() < 0.5) {
      result.push(offers[i]);
    }
  }
  return result;
}

const pointMock = [{
  basePrice: 500,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: 1,
  id: 0,
  offers: getOffersArrayMock('taxi'),
  type: 'taxi'
},
{
  basePrice: 2000,
  dateFrom: '2019-07-12T12:55:56.321Z',
  dateTo: '2019-07-14T12:01:13.653Z',
  destination: 2,
  id: 1,
  offers: getOffersArrayMock('drive'),
  type: 'drive'
},
{
  basePrice: 1500,
  dateFrom: '2019-07-15T09:32:12.532Z',
  dateTo: '2019-07-15T11:56:32.435Z',
  destination: 3,
  id: 2,
  offers: getOffersArrayMock('flight'),
  type: 'flight'
},
{
  basePrice: 250,
  dateFrom: '2019-07-16T15:12:52.532Z',
  dateTo: '2019-07-16T20:41:45.987Z',
  destination: 4,
  id: 3,
  offers: getOffersArrayMock('bus'),
  type: 'bus'
},
{
  basePrice: 120,
  dateFrom: '2019-07-18T06:23:00.235Z',
  dateTo: '2019-07-18T11:56:37.873Z',
  destination: 5,
  id: 4,
  offers: getOffersArrayMock('train'),
  type: 'train'
},
{
  basePrice: 3500,
  dateFrom: '2019-07-22T15:00:00.000Z',
  dateTo: '2019-07-24T10:15:00.324Z',
  destination: 6,
  id: 5,
  offers: getOffersArrayMock('ship'),
  type: 'ship'
},
{
  basePrice: 350,
  dateFrom: '2019-07-24T10:20:00.325Z',
  dateTo: '2019-07-24T22:33:34.531Z',
  destination: 7,
  id: 6,
  offers: getOffersArrayMock('sightseeing'),
  type: 'sightseeing'
}];

function getPointMock() {
  return pointMock;
}

function getDestinationMock() {
  return destinationMock;
}

function getOffersMock() {
  return offersMock;
}

function getOffersByType() {
  return offersByType;
}

export {getPointMock, getDestinationMock, getOffersMock, getOffersByType};
