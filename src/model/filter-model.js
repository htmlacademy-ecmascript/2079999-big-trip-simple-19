import { FilterValues } from '../const';

export default class FilterModel {

  #filter = FilterValues.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  set filter(value) {
    this.#filter = value;
  }
}
