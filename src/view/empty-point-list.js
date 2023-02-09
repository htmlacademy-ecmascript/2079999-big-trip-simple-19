import AbstractView from '../framework/view/abstract-view.js';

const FILTERS_MESSAGE = {
  everything: 'Click New Event to create your first point',
  past: 'There are no past events now',
  future: 'There are no future events now'
};

function createEmptyListTemplate(filter) {
  return (`
  <div class="trip-events__msg-container">
    <p class="trip-events__msg">${FILTERS_MESSAGE[filter]}</p>
  </div>`);
}
export default class EmptyPointListView extends AbstractView {

  #filter = null;

  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createEmptyListTemplate(this.#filter);
  }
}
