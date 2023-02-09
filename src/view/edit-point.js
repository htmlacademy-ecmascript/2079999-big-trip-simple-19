import { formatFullDate } from '../utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createEventTypeTemplate(pointType, offersTypes) {
  return offersTypes.map((eventType, index) => `
    <div class="event__type-item">
      <input id="event-type-${eventType}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}"${eventType === pointType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-${index}">${eventType}</label>
    </div>`).join('');
}

function isIncludes(pointOffers, offerType) {
  const pointOffersId = pointOffers.map((offer) => offer.id);
  return pointOffersId.includes(offerType.id);
}

function createOffersListTemplate(point, offersByType) {
  const offerType = offersByType.find((offer) => offer.type === point.type);
  return offerType.offers.map((offer, index) => `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${point.id}-${offer.id}-${index}" type="checkbox" name="event-offer-${point.id}-${offer.id}"${isIncludes(point.offers, offer) ? 'checked' : ''}>
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

function createEditPointTemplate(point, offersByType, destinations, offersTypes) {
  const eventTypes = createEventTypeTemplate(point.type, offersTypes);
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
  #pointsDestinations = null;
  #handleCloseClick = null;
  #point = null;
  #dateFromPicker = null;
  #dateToPicker = null;
  #handleDeletePoint = null;
  #handleUpdatePoint = null;
  #offersTypes = null;

  constructor(point, offersByType, handleCloseClick, pointsDestinations, handleDeletePoint, handleUpdatePoint) {
    super();
    this.#point = point;
    this._setState(EditPointView.parsePointToState(point));
    this.#offersByType = offersByType;
    this.#offersTypes = this.#offersByType.map((offerByType) => offerByType.type);
    this.#handleCloseClick = handleCloseClick;
    this.#pointsDestinations = pointsDestinations;
    this.#handleDeletePoint = handleDeletePoint;
    this.#handleUpdatePoint = handleUpdatePoint;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    this.element.addEventListener('submit', this.#savePointHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#setBasePriceHandler);
    this.element.querySelectorAll('.event__type-input').forEach((input) => input.addEventListener('click', this.#eventTypeHandler));
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#pointDestinationHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deletePointHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((input) => input.addEventListener('input', this.#offerChangeHandler));
    this.#setDatePicker();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#offersByType, this.#pointsDestinations, this.#offersTypes);
  }

  removeElement() {
    super.removeElement();

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    this.element.addEventListener('submit', this.#savePointHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#setBasePriceHandler);
    this.element.querySelectorAll('.event__type-input').forEach((input) => input.addEventListener('click', this.#eventTypeHandler));
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#pointDestinationHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deletePointHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((input) => input.addEventListener('input', this.#offerChangeHandler));
    this.#setDatePicker();
  }

  #setDatePicker = () => {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector(`#event-start-time-${this._state.id}`),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler
      }
    );

    this.#dateToPicker = flatpickr(
      this.element.querySelector(`#event-end-time-${this._state.id}`),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler
      }
    );
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement(
      {
        dateFrom: userDate
      }
    );
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement(
      {
        dateTo: userDate
      }
    );
  };

  #offerChangeHandler = (evt) => {
    const offerElement = evt.target;
    const newOfferId = Number(offerElement.name.slice(-1));
    const offersByType = this.#offersByType.find((offer) => offer.type === this.#point.type);
    const newOffer = offersByType.offers.find((offer) => offer.id === newOfferId);

    if (offerElement.checked) {
      this._state.offers.push(newOffer);
    } else {
      const offer = this._state.offers.find((elem) => JSON.stringify(elem) === JSON.stringify(newOffer));
      const offerInd = this._state.offers.indexOf(offer);
      this._state.offers.splice(offerInd, 1);
    }
  };

  #closeClickHandler = () => {
    this._setState(EditPointView.parsePointToState(this.#point));
    this.updateElement(this._state);
    this.#handleCloseClick();
  };

  #savePointHandler = (evt) => {
    evt.preventDefault();
    this.#handleUpdatePoint(this._state);
    this.#handleCloseClick();
  };

  #deletePointHandler = () => {
    this.#handleDeletePoint(this.#point);
  };

  #pointDestinationHandler = (evt) => {
    evt.preventDefault();
    this._state.destination = this.#pointsDestinations.filter((dest) => dest.name === evt.target.value)[0];
    this.updateElement(this._state);
  };

  #setBasePriceHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({basePrice: evt.target.value});
  };

  #eventTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({type: evt.target.value});
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
