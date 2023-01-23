import { OFFERS_TYPE } from '../const.js';
import { formatFullDate } from '../utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createEventTypeTemplate(pointType) {
  return OFFERS_TYPE.map((eventType, index) => `
    <div class="event__type-item">
      <input id="event-type-${eventType}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}"${eventType === pointType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-${index}">${eventType}</label>
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

function createDestinationOptions(destinations) {
  return destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

function createEditPointTemplate(point, offersByType, destinations) {
  const eventTypes = createEventTypeTemplate(point.type);
  const offersList = createOffersListTemplate(point, offersByType);

  return (`<form class="event event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Event type</legend>
                    ${eventTypes}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-${point.id}">
                  ${point.type}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${point.destination.name}" list="destination-list-${point.id}">
                <datalist id="destination-list-${point.id}">
                  ${createDestinationOptions(destinations)}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
                <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${formatFullDate(point.dateFrom)}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
                <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${formatFullDate(point.dateTo)}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-${point.id}">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-${point.id}" type="text" name="event-price" value="${point.basePrice}">
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

export default class EditPointView extends AbstractStatefulView {

  #offersByType = null;
  #allPoints = null;
  #closeClickHandler = null;
  #destinations = null;

  constructor(point, offersByType, closeClickHandler, allPoints) {
    super();

    this._setState(EditPointView.parsePointToState(point));
    this.#offersByType = offersByType;
    this.#closeClickHandler = closeClickHandler;
    this.#allPoints = allPoints;
    this.#destinations = this.#allPoints.map((pointData) => pointData.destination);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    this.element.addEventListener('submit', this.#handleCloseClick);
    this.element.querySelectorAll('.event__type-input').forEach((input) => input.addEventListener('click', this.#eventTypeHandler));
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#pointDestinationHandler);
  }

  #pointDestinationHandler = (evt) => {
    evt.preventDefault();
    this._state.destination = this.#destinations.filter((dest) => dest.name === evt.target.value)[0];
    this.updateElement(this._state);
  };

  #eventTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({type: evt.target.value});
  };

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    this.element.addEventListener('submit', this.#handleCloseClick);
    this.element.querySelectorAll('.event__type-input').forEach((input) => input.addEventListener('click', this.#eventTypeHandler));
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#pointDestinationHandler);
  }

  #handleCloseClick = (evt) => {
    evt.preventDefault();
    this.#closeClickHandler();
  };

  get template() {
    return createEditPointTemplate(this._state, this.#offersByType, this.#destinations);
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
