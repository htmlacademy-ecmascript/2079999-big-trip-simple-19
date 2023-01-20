import AbstractView from '../framework/view/abstract-view.js';

const FILTERS_MESSAGE = {
  everything: 'Click New Event to create your first point',
  past: 'There are no past events now',
  future: 'There are no future events now'
};

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
    <p class="trip-events__msg">${FILTERS_MESSAGE[checkedFilter]}</p>
  </div>`);
}
export default class EmptyPointListView extends AbstractView {

  get template() {
    return createEmptyListTemplate();
  }
}
