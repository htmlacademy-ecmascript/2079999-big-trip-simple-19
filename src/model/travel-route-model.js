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
  }

  get points() {
    for (let i = 0; i < this.#points.length; i++) {
      this.#points[i].destination = this.#destinations.find((destination) => this.#points[i].destination === destination.id);
      for (let j = 0; j < this.#points[i].offers.length; j++) {
        this.#points[i].offers[j] = this.#offers.find((offer) => this.#points[i].offers[j] === offer.id);
      }
    }
    return this.#points;
  }

  get offersByType() {
    for (let i = 0; i < this.#offersByType.length; i++) {
      for (let j = 0; j < this.#offersByType[i].offers.length; j++) {
        this.#offersByType[i].offers[j] = this.#offers.find((offer) => this.#offersByType[i].offers[j] === offer.id);
      }
    }
    return this.#offersByType;
  }
}
