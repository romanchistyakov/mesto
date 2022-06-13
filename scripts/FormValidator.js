export class FormValidator {
    constructor(configValidation, formElement) {
        this._formElement = formElement;
        this._inputSelector = configValidation.inputSelector;
        this._submitButtonSelector = configValidation.submitButtonSelector;
        this._inactiveButtonClass = configValidation.inactiveButtonClass;
        this._inputErrorClass = configValidation.inputErrorClass;
        this._errorClass = configValidation.errorClass;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    enableValidation() {
        this._setEventListener();
    }

    _setEventListener() {

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList);
            })
        })

        this._formElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' & this._hasInvalidInput(this._inputList)) {
                event.preventDeafault();
            }
        })
    }

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _showInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);     
    }

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
          } else {
            this._hideInputError(inputElement);
          }
    }

    _toggleButtonState = () => {

        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        if (this._hasInvalidInput(this._inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
        }
        else {
            buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    checkFormManual = () => {
        this._toggleButtonState();
        this._inputList.forEach(this._checkInputValidity);
    }

}