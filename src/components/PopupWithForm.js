import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({handleSubmitForm, popupSelector}) {
        super(popupSelector);

        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__input');

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
            this.close();
        });
    }

    close() {
        super.close();

        this._form.reset();
    }
}