import {createElement} from '../render.js';
import {formatDayData, formatTime} from '../utils.js';

function createOffersListTemplate(point) {
  return point.offers.map((offer) => `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`)
    .join('');
}

function createPointTemplate(point) {
  return (`<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="2019-03-18">${formatDayData(point.dateFrom)}</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${point.destination.name}</h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-18T10:30">${formatTime(point.dateFrom)}</time>
                  &mdash;
                  <time class="event__end-time" datetime="2019-03-18T11:00">${formatTime(point.dateTo)}</time>
                </p>
              </div>
              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
              </p>
              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                ${createOffersListTemplate(point)}
              </ul>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>`);
}

export default class PointView {
  #point = null;
  #element = null;

  constructor(point) {
    this.#point = point;
  }

  #getTemplate(point) {
    return createPointTemplate(point);
  }

  get element() {
    if (!this.#element){
      return createElement(this.#getTemplate(this.#point));
    } else {
      return this.#element;
    }
  }

  deleteElement() {
    this.#element = null;
  }
}
