import { createElement } from '../render.js';
import { OFFERS_TYPE } from '../const.js';
import { formatFullDate } from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';

function createEventTypeTemplate(pointType) {
  return OFFERS_TYPE.map((eventType, index) => `
    <div class="event__type-item">
      <input id="event-type-${eventType}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}"${eventType === pointType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${eventType}</label>
    </div>`).join('');
}

function isIncludes(pointOffers, offerType) {
  for (let i = 0; i < pointOffers.length; i++) {
    return (pointOffers[i].id === offerType);
  }
}

function createOffersListTemplate(point, offersByType) {
  const offerType = offersByType.find((offer) => offer.type === point.type);
  return offerType.offers.map((offer, index) => `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${point.id}-${offer.id}-${index}" type="checkbox" name="event-offer-${point.id}-${offer.id}"${isIncludes(point.offers, offer.id) ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-${point.id}-${offer.id}-${index}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`)
    .join('');
}

function createEditPointTemplate(point, offersByType) {
  const eventTypes = createEventTypeTemplate(point.type);
  const offersList = createOffersListTemplate(point, offersByType);

  return (`<form class="event event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Event type</legend>
                    ${eventTypes}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${point.type}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination.name}" list="destination-list-1">
                <datalist id="destination-list-1">
                  <option value="Amsterdam"></option>
                  <option value="Geneva"></option>
                  <option value="Chamonix"></option>
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">From</label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatFullDate(point.dateFrom)}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">To</label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatFullDate(point.dateTo)}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.basePrice}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Delete</button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </header>
            <section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                  ${offersList}
                </div>
              </section>

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">${point.destination.name}</h3>
                <p class="event__destination-description">${point.destination.description}</p>
              </section>
            </section>
          </form>`);
}

export default class EditPointView extends AbstractView {
  #point = null;
  #offersByType = null;
  #element = null;

  constructor(point, offersByType) {
    super();
    this.#point = point;
    this.#offersByType = offersByType;
  }

  #getTemplate(point, offersByType) {
    return createEditPointTemplate(point, offersByType);
  }

  get element() {
    if (!this.#element){
      this.#element = createElement(this.#getTemplate(this.#point, this.#offersByType));
    }
    return this.#element;
  }
}
