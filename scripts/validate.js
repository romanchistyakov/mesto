// Показ ошибки инпута формы
const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};
// Скрытие ошибки инпута формы
const hideInputError = function (formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};
// Проверка валидности инпутов форм и отображение/скрытие ошибок
const checkInputValidity = function (formElement, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};
// Проверка валидности формы
const hasInvalidInput = function (inputList) {
    return inputList.some( function (inputElement) {
      return !inputElement.validity.valid;
    });
};
// Переключение состояния кнопки отправки формы
const toggleButtonState = function (inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
    }
    else {
      buttonElement.classList.remove(inactiveButtonClass);
    }
};
// Подключение слушателей изменения инпутов форм
const setEventListeners = function (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement);

    inputList.forEach( function (inputElement) {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });

    formElement.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' & hasInvalidInput(inputList)) {
        event.preventDefault();
      }
    })
};

const resetErrors = function (inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, errorSpanSelector, formList) {

  const errorSpanList = Array.from(document.querySelectorAll(errorSpanSelector));

  // Очистка сообщений об ошибке
  errorSpanList.forEach( (errorSpanElement) => {
    errorSpanElement.textContent = '';
    errorSpanElement.classList.remove(errorClass);
  });

  // Удаление класса видимости ошибки из инпута
  formList.forEach( (formElement) => {

    const buttonElement = formElement.querySelector(submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));

    inputList.forEach( (inputElement) => {
      inputElement.classList.remove(inputErrorClass)
    });

    // Сброс состояния кнопок отправки форм
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  });
};

// Функция запуска валидации
const enableValidation = function ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, openButtonSelector, errorSpanSelector}) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach( function (formElement) {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });

  const buttonOpenList = Array.from(document.querySelectorAll(openButtonSelector));

  buttonOpenList.forEach(function (buttonOpenElement) {
    buttonOpenElement.addEventListener('click', function () {
      resetErrors(inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, errorSpanSelector, formList);
    })
  });
};

// Конфигурация параметров для валидации
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  openButtonSelector: '.profile__button_type_open-popup',
  errorSpanSelector: '.popup__input-error'
};

// Запуск валидации форм в реальном времени
enableValidation(configValidation);