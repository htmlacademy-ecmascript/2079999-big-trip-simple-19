import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createEventTypeTemplate(pointType, offersTypes) {
  return offersTypes.map((eventType, index) => `
    <div class="event__type-item">
      <input id="event-type-${eventType}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}"${eventType === pointType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-${index}">${eventType}</label>
    </div>`).join('');
}

function createOffersListTemplate(point, offersByType) {
  const offerType = offersByType.find((offer) => offer.type === point.type);
  return offerType.offers.map((offer) => `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${point.id}-${offer.id}" type="checkbox" name="event-offer-${point.id}-${offer.id}">
          <label class="event__offer-label" for="event-offer-${point.id}-${offer.id}">
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

function getDestinationPhotos(pointDestination) {
  if (!pointDestination.pictures) {
    return '';
  }
  return pointDestination.pictures.map((picture) => `
  <img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');
}

function createAddPointTemplate(destinations, offersByType, point, offersTypes) {
  const eventTypes = createEventTypeTemplate(point.type, offersTypes);
  const offersList = createOffersListTemplate(point, offersByType);

  return (`<form class="event event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Event type</legend>
                    ${eventTypes}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination">
                  ${point.type}
                </label>
                <input class="event__input  event__input--destination" id="event-destination" type="text" name="event-destination" value="${point.destination.name}" list="destination-list">
                <datalist id="destination-list">
                  ${createDestinationOptions(destinations)}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time">From</label>
                <input class="event__input  event__input--time" id="event-start-time" type="text" name="event-start-time" value="${point.dateFrom}">
                &mdash;
                <label class="visually-hidden" for="event-end-time">To</label>
                <input class="event__input  event__input--time" id="event-end-time" type="text" name="event-end-time" value="${point.dateTo}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price" type="text" name="event-price" value="${point.basePrice}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>
            <section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                  ${offersList}
                </div>
              </section>

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${point.destination.description}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${getDestinationPhotos(point.destination)}
                  </div>
                </div>
              </section>
            </section>
          </form>`);
}

export default class AddPointView extends AbstractStatefulView {
  #destinations = null;
  #pointData = {
    destination: {
      name: 'city',
      description: ''
    },
    type: 'taxi',
    dateFrom: dayjs().format('DD/MM/YY HH:mm'),
    dateTo: dayjs().add(1, 'd').format('DD/MM/YY HH:mm'),
    basePrice: '0',
    offers: []
  };

  #dateFromPicker = null;
  #dateToPicker = null;
  #offersByType = null;
  #offersTypes = null;
  #handleClosePoint = null;
  #handleAddPoint = null;

  constructor(pointsDestinations, offersByType, handleClosePoint, handleAddPoint) {
    super();
    this._setState(AddPointView.parsePointToState(this.#pointData));
    this.#destinations = pointsDestinations;
    this.#offersByType = offersByType;
    this.#offersTypes = this.#offersByType.map((offerByType) => offerByType.type);
    this.#handleClosePoint = handleClosePoint;
    this.#handleAddPoint = handleAddPoint;
    this.element.querySelectorAll('.event__type-input').forEach((input) => input.addEventListener('click', this.#eventTypeHandler));
    this.element.querySelector('.event__input--price').addEventListener('change', this.#setBasePriceHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#setDestinationHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#handleClosePoint);
    this.element.addEventListener('submit', this.#savePointHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((input) => input.addEventListener('input', this.#offerChangeHandler));
    this.#setDatePicker();
  }

  get template() {
    return createAddPointTemplate(this.#destinations, this.#offersByType, this._state, this.#offersTypes);
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
    this.element.querySelectorAll('.event__type-input').forEach((input) => input.addEventListener('click', this.#eventTypeHandler));
    this.element.querySelector('.event__input--price').addEventListener('change', this.#setBasePriceHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#setDestinationHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#handleClosePoint);
    this.element.addEventListener('submit', this.#savePointHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((input) => input.addEventListener('input', this.#offerChangeHandler));
    this.#setDatePicker();
  }

  #isValidForm() {
    const destinationsList = this.#destinations.map((destination) => destination.name);
    if ((this._state.basePrice <= 0) || (!this._state.destination.description) || (!destinationsList.includes(this._state.destination.name))) {
      return false;
    }
    return true;
  }

  #setDatePicker = () => {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('#event-start-time'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler
      }
    );

    this.#dateToPicker = flatpickr(
      this.element.querySelector('#event-end-time'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler
      }
    );
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({dateFrom: userDate.toISOString()});
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({dateTo: userDate.toISOString()});
  };

  #savePointHandler = (evt) => {
    evt.preventDefault();
    if (this.#isValidForm()) {
      this.#handleAddPoint(this._state);
      this.#handleClosePoint();
    }
  };

  #setDestinationHandler = (evt) => {
    evt.preventDefault();
    const destinationsList = this.#destinations.map((destination) => destination.name);
    if (destinationsList.includes(evt.target.value)) {
      const destination = this.#destinations.filter((dest) => dest.name === evt.target.value)[0];
      this.updateElement({destination: destination});
    }
  };

  #setBasePriceHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({basePrice: evt.target.value});
  };

  #eventTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({type: evt.target.value});
  };

  #offerChangeHandler = (evt) => {
    const offerElement = evt.target;
    const newOfferId = Number(offerElement.name.slice(-1));
    const offersByType = this.#offersByType.find((offer) => offer.type === this.#pointData.type);
    const newOffer = offersByType.offers.find((offer) => offer.id === newOfferId);

    if (offerElement.checked) {
      this._state.offers.push(newOffer);
    } else {
      const offer = this._state.offers.find((elem) => JSON.stringify(elem) === JSON.stringify(newOffer));
      const offerInd = this._state.offers.indexOf(offer);
      this._state.offers.splice(offerInd, 1);
    }
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
