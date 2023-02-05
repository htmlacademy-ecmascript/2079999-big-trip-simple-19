import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { OFFERS_TYPE } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createEventTypeTemplate(pointType) {
  return OFFERS_TYPE.map((eventType, index) => `
    <div class="event__type-item">
      <input id="event-type-${eventType}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}"${eventType === pointType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-${index}">${eventType}</label>
    </div>`).join('');
}

function createDestinationOptions(destinations) {
  return destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

function createAddPointTemplate(destinations, point) {
  const eventTypes = createEventTypeTemplate(point.type);

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
                <input class="event__input  event__input--destination" id="event-destination" type="text" name="event-destination" value="${point.destination}" list="destination-list">
                <datalist id="destination-list">
                  ${createDestinationOptions(destinations)}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time">From</label>
                <input class="event__input  event__input--time" id="event-start-time" type="text" name="event-start-time" value="--/--/-- --:--">
                &mdash;
                <label class="visually-hidden" for="event-end-time">To</label>
                <input class="event__input  event__input--time" id="event-end-time" type="text" name="event-end-time" value="05/02/23 12:00">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price" type="text" name="event-price" value="">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>
            <section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
                    <label class="event__offer-label" for="event-offer-luggage-1">
                      <span class="event__offer-title">Add luggage</span>
                      &plus;&euro;&nbsp;
                      <span class="event__offer-price">30</span>
                    </label>
                  </div>

                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
                    <label class="event__offer-label" for="event-offer-comfort-1">
                      <span class="event__offer-title">Switch to comfort class</span>
                      &plus;&euro;&nbsp;
                      <span class="event__offer-price">100</span>
                    </label>
                  </div>

                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
                    <label class="event__offer-label" for="event-offer-meal-1">
                      <span class="event__offer-title">Add meal</span>
                      &plus;&euro;&nbsp;
                      <span class="event__offer-price">15</span>
                    </label>
                  </div>

                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
                    <label class="event__offer-label" for="event-offer-seats-1">
                      <span class="event__offer-title">Choose seats</span>
                      &plus;&euro;&nbsp;
                      <span class="event__offer-price">5</span>
                    </label>
                  </div>

                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
                    <label class="event__offer-label" for="event-offer-train-1">
                      <span class="event__offer-title">Travel by train</span>
                      &plus;&euro;&nbsp;
                      <span class="event__offer-price">40</span>
                    </label>
                  </div>
                </div>
              </section>

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
                    <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
                    <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
                    <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
                    <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
                  </div>
                </div>
              </section>
            </section>
          </form>`);
}

export default class AddPointView extends AbstractStatefulView {
  #destinations = null;
  #pointData = {
    destination: '',
    type: ''
  };

  #dateFromPicker = null;
  #dateToPicker = null;

  constructor(pointsDestinations) {
    super();
    this._setState(AddPointView.parsePointToState(this.#pointData));
    this.#destinations = pointsDestinations;
    this.element.querySelectorAll('.event__type-input').forEach((input) => input.addEventListener('click', this.#eventTypeHandler));
    this.element.querySelector('.event__input--price').addEventListener('change', this.#setBasePriceHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#setDestinationHandler);
    this.#setDatePicker();
  }

  #setDestinationHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({destination: evt.target.value});
    console.log(this._state);
  };

  #setBasePriceHandler = (evt) => {
    evt.preventDefault();
    this._state.basePrice = evt.target.value;
    this.updateElement(this._state);
  };

  #eventTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({type: evt.target.value});
  };

  _restoreHandlers() {
    this.element.querySelectorAll('.event__type-input').forEach((input) => input.addEventListener('click', this.#eventTypeHandler));
    this.element.querySelector('.event__input--price').addEventListener('change', this.#setBasePriceHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#setDestinationHandler);
    this.#setDatePicker();
  }

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

  #setDatePicker = () => {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('#event-start-time'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        onChange: this.#dateFromChangeHandler
      }
    );

    this.#dateToPicker = flatpickr(
      this.element.querySelector('#event-end-time'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        onChange: this.#dateToChangeHandler
      }
    );
  };

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

  get template() {
    return createAddPointTemplate(this.#destinations, this._state);
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
