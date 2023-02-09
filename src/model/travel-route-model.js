import { FilterValues } from '../const';
import dayjs from 'dayjs';

export default class PointModel {
  #pointsApiService = null;
  #destinations = null;
  #offersByType = null;
  #points = null;

  constructor(pointsApiService) {
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#adaptFromServer(this.#points);
  }

  get destinations() {
    return this.#destinations;
  }

  get offersByTypes() {
    return this.#offersByType;
  }

  set points(points) {
    this. this.#points = points;
  }

  async init() {
    this.#destinations = await this.#pointsApiService.destinations;
    this.#offersByType = await this.#pointsApiService.offers;
    this.#points = await this.#pointsApiService.points;
    this.#points = this.#adaptFromServer(this.#points);
    this.#comparePointsAndDestination();
    this.#comparePointsAndOffers();
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

  updatePoint = (pointData) => {
    this.#pointsApiService.updatePoint(pointData);
    this.#points.find((point, index) => {
      if (point.id === pointData.id) {
        this.#points[index] = pointData;
      }
    });
  };

  deletePoint = (pointData) => {
    this.#pointsApiService.deletePoint(pointData);
    this.#points.splice((this.#points.indexOf(pointData)), 1);
  };

  addPoint = (pointData) => {
    this.#pointsApiService.addPoint(pointData);
    this.#points.push(pointData);
  };

  #adaptFromServer(data) {
    const convertedData = [...data];
    convertedData.forEach((obj) => {
      obj.basePrice = obj.base_price;
      delete obj.base_price;

      obj.dateFrom = obj.date_from;
      delete obj.date_from;

      obj.dateTo = obj.date_to;
      delete obj.date_to;
    });
    return convertedData;
  }

  #comparePointsAndDestination() {
    for (let i = 0; i < this.#points.length; i++) {
      this.#points[i].destination = this.#destinations.find((destination) => this.#points[i].destination === destination.id);
    }
  }

  #comparePointsAndOffers() {
    this.#points.forEach((point) => {
      const offerByType = this.#offersByType.find((offer) => offer.type === point.type);
      point.offers.forEach((offerId) => {
        offerId = offerByType.offers.find((offer) => offer.id === offerId);
      });
      for (let i = 0; i < point.offers.length; i++) {
        point.offers[i] = offerByType.offers.find((offer) => offer.id === point.offers[i]);
      }
    });
  }
}

