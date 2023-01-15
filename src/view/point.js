import AbstractView from '../framework/view/abstract-view.js';
import { createElement } from '../render.js';
import { formatDayDate, formatTime } from '../utils.js';

const FILTERS_MESSAGE = {
  everything:'Click New Event to create your first point',
  past: 'There are no past events now',
  future: 'There are no future events now'
};

function createOffersListTemplate(point) {
  return point.offers.map((offer) => `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`)
    .join('');
}

function createEmptyListTemplate() {
  const filters = document.querySelectorAll('.trip-filters__filter');
  let checkedFilter = 'everything';
  filters.forEach((filter) => {
    if (filter.firstElementChild.checked) {
      checkedFilter = filter.firstElementChild.value;
    }
  });
  return (`
  <div>
    <h2 class="visually-hidden">Trip events</h2>
    <p class="trip-events__msg">${FILTERS_MESSAGE[checkedFilter]}</p>
  </div>`);
}

function createPointTemplate(point) {
  if (!point) {
    return createEmptyListTemplate();
  }
  return (`<ul class="trip-events__list"><li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="2019-03-18">${formatDayDate(point.dateFrom)}</time>
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
          </li><ul>`);
}

export default class PointView extends AbstractView {
  #point = null;
  #element = null;
  #handleOpenForm = null;


  constructor(point, handleOpenForm) {
    super();
    this.#point = point;
    this.#handleOpenForm = handleOpenForm;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleOpenForm);
  }

  #getTemplate(point) {
    return createPointTemplate(point);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.#getTemplate(this.#point));
    }
    return this.#element;
  }
}
