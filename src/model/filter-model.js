export default class FilterModel {

  #filter = null;

  constructor() {
  }

  get filter() {
    return this.#filter;
  }

  setFilter(value) {
    this.#filter = value;
  }
}
