import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageSrc = this._popup.querySelector('.popup__image-source');
        this._imageHead = this._popup.querySelector('.popup__image-head');
    }

    open(data) {
        super.open();
        this._imageSrc.src = data.link;
        this._imageSrc.alt = data.name;
        this._imageHead.textContent = data.name;
    }
}