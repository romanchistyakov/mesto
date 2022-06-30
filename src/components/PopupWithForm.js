import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({handleSubmitForm, popupSelector}) {
        super(popupSelector);

        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._button = this._form.querySelector('.popup__button');
        this._defaultState = this._button.textContent;
    }

    doLoading = (isLoading) => {
        if(isLoading) {
          this._button.textContent = 'Сохранение...';
        }
        else {
          this._button.textContent = this._defaultState;
        }
      }

    _getInputValues() {
        this._formValues = {};

        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListener() {
        super.setEventListener();

        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmitForm(this._getInputValues());
        });
    }

    close() {
        super.close();

        this._form.reset();
    }
}