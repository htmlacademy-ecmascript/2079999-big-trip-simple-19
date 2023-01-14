import { render, RenderPosition } from '../framework/render.js';
import PointView from '../view/point.js';
import EditPointView from '../view/edit-point.js';
import { isEscape } from '../utils.js';

export default class PointPresenter {
    #point = null;
    #position = null;
    #model = null;

    constructor(point, position, model) {
        this.#point = point;
        this.#position = position;
        this.#model = model;
    }

    #render(point, position, model) {
        const pointView = new PointView(point, openPoint);
        const editView = new EditPointView(point, model.offersByTypes, closePoint);
        render(pointView, position);

        function escKeydownHandler(evt) {
            if (isEscape(evt)) {
                closePoint(evt);
            }
          };
      
        function closePoint(evt) {
            evt.preventDefault();
            render(pointView, position);
            position.replaceChild(pointView.element, editView.element);
            document.removeEventListener('keydown', escKeydownHandler);
        }
    
        function openPoint() {
            render(editView, position);
            position.replaceChild(editView.element, pointView.element);
            document.addEventListener('keydown', escKeydownHandler);
        }
    }

    init() {
        this.#render(this.#point, this.#position, this.#model);
    }
}