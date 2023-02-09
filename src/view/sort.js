import AbstractView from '../framework/view/abstract-view.js';

const SortMode = {
  DAY: 'day',
  PRICE: 'price'
};

function createSortTemplate() {
  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
              <label class="trip-sort__btn" for="sort-day">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" disabled >
              <label class="trip-sort__btn" for="sort-time">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
              <label class="trip-sort__btn" for="sort-price">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>`);
}

export default class SortView extends AbstractView {
  #sortPointsByPriceHandler = null;
  #sortPointsByDateHandler = null;
  #sortMode = null;

  constructor(sortPointsByPriceHandler, sortPointsByDateHandler) {
    super();
    this.#sortPointsByPriceHandler = sortPointsByPriceHandler;
    this.#sortPointsByDateHandler = sortPointsByDateHandler;
    this.#sortMode = SortMode.DAY;
    this.#addEventListenersToSort();
  }

  get template() {
    return createSortTemplate();
  }

  #addEventListenersToSort() {
    this.element.querySelector('#sort-day').addEventListener('click', this.#handleSortByDateHandler);
    this.element.querySelector('#sort-price').addEventListener('click', this.#handleSortByPriceHandler);
  }

  #handleSortByPriceHandler = () => {
    if (this.#sortMode !== SortMode.PRICE) {
      this.#sortPointsByPriceHandler();
    }
    this.#sortMode = SortMode.PRICE;
  };

  #handleSortByDateHandler = () => {
    if (this.#sortMode !== SortMode.DAY) {
      this.#sortPointsByDateHandler();
    }
    this.#sortMode = SortMode.DAY;
  };
}
