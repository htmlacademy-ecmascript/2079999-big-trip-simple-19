import { FilterValues } from '../const';

export default class FilterModel {

  #filter = FilterValues.EVERYTHING;

  constructor() {
  }

  get filter() {
    return this.#filter;
  }

  set filter(value) {
    this.#filter = value;
  }
}
