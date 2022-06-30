import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor({popupSelector}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._button = this._form.querySelector('.popup__button');
        this._defaultState = this._button.textContent;
    }

    setSubmitHandler({handleDeleteImage}) {
        this._handleDeleteImage = handleDeleteImage;
    }

    doLoading = (isLoading) => {
      if(isLoading) {
        this._button.textContent = 'Удаление...';
      }
      else {
        this._button.textContent = this._defaultState;
      }
    }

    setEventListener() {
        super.setEventListener();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleDeleteImage();
        })
    }
}