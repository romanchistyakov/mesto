import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({name,link}, popupSelector) {
        super(popupSelector);
        this._name = name;
        this._link = link;
    }

    open() {
        super.open();
        this._popup.querySelector('.popup__image-source').src = this._link;
        this._popup.querySelector('.popup__image-source').alt = this._name;
        this._popup.querySelector('.popup__image-head').textContent = this._name;
    }
}