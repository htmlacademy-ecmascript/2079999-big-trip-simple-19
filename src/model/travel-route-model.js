export default class PointModel {
  constructor({points, destinations, offers}) {
    this.points = points;
    this.destinations = destinations;
    this.offers = offers;
  }

  composeData() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].destination = this.destinations.find((destination) => this.points[i].destination === destination.id);
      for (let j = 0; j < this.points[i].offers.length; j++) {
        this.points[i].offers[j] = this.offers.find((offer) => this.points[i].offers[j] === offer.id);
      }
    }
    return this.points;
  }

  getPoints() {
    return this.composeData();
  }
}
