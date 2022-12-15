import { getRandomElem } from '../util.js';

const destinationMock = [{
  id: 1,
  description: 'Bali is not only a mecca for surfers, where they forget about shampoo and clothes.',
  name: 'Bali',
  pictures: [
    {
      src: `http://picsum.photos/300/200?r=${Math.random()}`,
      description: 'Very beautiful landscape'
    }
  ]
},
{
  id: 2,
  description: 'Mayrhofen is a town in the Zillertal (Ziller river valley) in the Austrian state of Tyrol. It is located approximately an hour from the Tyrolean capital city of Innsbruck.',
  name: 'Mayrhofen',
  pictures: [
    {
      src: `http://picsum.photos/300/200?r=${Math.random()}`,
      description: 'Very beautiful landscape'
    }
  ]
},
{
  id: 3,
  description: 'Cappadocia is a historical region in Central Anatolia, Turkey. It largely is in the provinces Nevşehir, Kayseri, Aksaray, Krşehir, Sivas and Niğde.',
  name: 'Cappadocia',
  pictures: [
    {
      src: `http://picsum.photos/300/200?r=${Math.random()}`,
      description: 'Very beautiful landscape'
    }
  ]
},
{
  id: 4,
  description: 'Munich is the capital and most populous city of the German state of Bavaria.',
  name: 'Munich',
  pictures: [
    {
      src: `http://picsum.photos/300/200?r=${Math.random()}`,
      description: 'Very beautiful landscape'
    }
  ]
},
{
  id: 5,
  description: 'Qatar is a country in Western Asia. It occupies the small Qatar Peninsula on the northeastern coast of the Arabian Peninsula in the Middle East.',
  name: 'Qatar',
  pictures: [
    {
      src: `http://picsum.photos/300/200?r=${Math.random()}`,
      description: 'Very beautiful landscape'
    }
  ]
},
{
  id: 6,
  description: 'Lloret de Mar is a Mediterranean coastal town in Catalonia, Spain.',
  name: 'Lloret de Mar',
  pictures: [
    {
      src: `http://picsum.photos/300/200?r=${Math.random()}`,
      description: 'Very beautiful landscape'
    }
  ]
},
{
  id: 7,
  description: 'Venice is a city in northeastern Italy and the capital of the Veneto region. It is built on a group of 118 small islands.',
  name: 'Venice',
  pictures: [
    {
      src: `http://picsum.photos/300/200?r=${Math.random()}`,
      description: 'Very beautiful landscape'
    }
  ]
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

const offerByType = [{
  type: 'taxi',
  offers: [{
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
  }],
},
{
  type: 'bus',
  offers: [{
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
    id: 10,
    title: 'Without a queue.',
    price: 50,
  }],
},
{
  type: 'train',
  offers: [{
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
  }],
},
{
  type: 'ship',
  offers: [{
    id: 3,
    title: 'Power bank.',
    price: 20,
  },
  {
    id: 7,
    title: 'The cure for motion sickness.',
    price: 20,
  }],
},
{
  type: 'drive',
  offers: [{
    id: 2,
    title: 'Extra space.',
    price: 200,
  },
  {
    id: 3,
    title: 'Power bank.',
    price: 20,
  }],
},
{
  type: 'flight',
  offers: [{
    id: 2,
    title: 'Extra space.',
    price: 200,
  },
  {
    id: 3,
    title: 'Power bank.',
    price: 20,
  }],
},
{
  type: 'check-in',
  offers: [{
    id: 5,
    title: 'Additional set of bed linen.',
    price: 40,
  },
  {
    id: 10,
    title: 'Without a queue.',
    price: 50,
  }],
},
{
  type: 'sightseeing',
  offers: [{
    id: 8,
    title: 'Guide services.',
    price: 300,
  },
  {
    id: 10,
    title: 'Without a queue.',
    price: 50,
  }],
},
{
  type: 'restaurant',
  offers: [{
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
    id: 9,
    title: 'Personal waiter.',
    price: 200,
  },
  {
    id: 10,
    title: 'Without a queue.',
    price: 50,
  }],
}];

const pointMock = [{
  basePrice: 500,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: 1,
  id: '0',
  offers: offerByType[offerByType.findIndex((elem) => elem.type === 'taxi')].offers,
  type: 'taxi'
},
{
  basePrice: 2000,
  dateFrom: '2019-07-12T12:55:56.321Z',
  dateTo: '2019-07-14T12:01:13.653Z',
  destination: 2,
  id: '1',
  offers: offerByType[offerByType.findIndex((elem) => elem.type === 'drive')].offers,
  type: 'drive'
},
{
  basePrice: 1500,
  dateFrom: '2019-07-15T09:32:12.532Z',
  dateTo: '2019-07-15T11:56:32.435Z',
  destination: 3,
  id: '2',
  offers: offerByType[offerByType.findIndex((elem) => elem.type === 'flight')].offers,
  type: 'flight'
},
{
  basePrice: 250,
  dateFrom: '2019-07-16T15:12:52.532Z',
  dateTo: '2019-07-16T20:41:45.987Z',
  destination: 4,
  id: '3',
  offers: offerByType[offerByType.findIndex((elem) => elem.type === 'bus')].offers,
  type: 'bus'
},
{
  basePrice: 120,
  dateFrom: '2019-07-18T06:23:00.235Z',
  dateTo: '2019-07-18T11:56:37.873Z',
  destination: 5,
  id: '4',
  offers: offerByType[offerByType.findIndex((elem) => elem.type === 'train')].offers,
  type: 'train'
},
{
  basePrice: 3500,
  dateFrom: '2019-07-22T15:00:00.000Z',
  dateTo: '2019-07-24T10:15:00.324Z',
  destination: 6,
  id: '5',
  offers: offerByType[offerByType.findIndex((elem) => elem.type === 'ship')].offers,
  type: 'ship'
},
{
  basePrice: 350,
  dateFrom: '2019-07-24T10:20:00.325Z',
  dateTo: '2019-07-24T22:33:34.531Z',
  destination: 7,
  id: '6',
  offers: offerByType[offerByType.findIndex((elem) => elem.type === 'sightseeing')].offers,
  type: 'sightseeing'
}];

function getRandomPointMock() {
  return getRandomElem(pointMock);
}

function getDestinationMock() {
  return destinationMock;
}

function getOffersMock() {
  return offersMock;
}

function getOffersByTypeMock() {
  return offerByType;
}

export {getRandomPointMock, getDestinationMock, getOffersMock, getOffersByTypeMock};
