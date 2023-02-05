import { FilterValues } from '../const';
import dayjs from 'dayjs';

export default class PointModel {
  #points = null;
  #destinations = null;
  #offers = null;
  #offersByType = null;

  constructor({points, destinations, offers, offersByType}) {
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#offersByType = offersByType;
    this.#compareOffersByType();
    this.#comparePoints();
  }

  #comparePoints() {
    for (let i = 0; i < this.#points.length; i++) {
      this.#points[i].destination = this.#destinations.find((destination) => this.#points[i].destination === destination.id);
      for (let j = 0; j < this.#points[i].offers.length; j++) {
        this.#points[i].offers[j] = this.#offers.find((offer) => this.#points[i].offers[j] === offer.id);
      }
    }
  }

  #compareOffersByType() {
    for (let i = 0; i < this.#offersByType.length; i++) {
      for (let j = 0; j < this.#offersByType[i].offers.length; j++) {
        this.#offersByType[i].offers[j] = this.#offers.find((offer) => this.#offersByType[i].offers[j] === offer.id);
      }
    }
  }

  get destinations() {
    return this.#destinations;
  }

  get points() {
    return this.#points;
  }

  get offersByTypes() {
    return this.#offersByType;
  }

  set points (points) {
    this.#points = points;
  }

  filterPoints = (filterValue) => {
    const now = dayjs();

    if (filterValue === FilterValues.PAST) {
      return this.#points.filter((pointData) => dayjs(pointData.dateFrom) < now);
    }

    if (filterValue === FilterValues.FUTURE) {
      return this.#points.filter((pointData) => dayjs(pointData.dateFrom) > now);
    }

    return this.#points;
  };

  updatePoint(pointData) {
    this.#points.find((point, index) => {
      if (point.id === pointData.id) {
        this.#points[index] = pointData;
      }
    });
  }

  deletePoint(pointdata) {
    this.#points.splice((this.#points.indexOf(pointdata)), 1);
  }

  addPoint(pointData) {
    this.#points.push(pointData);
  }
}
