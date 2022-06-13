import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup } from "./popup.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Конфигурация параметров для валидации
const configValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

// Закрытие попапа кликом на оверлэй и кнопку Закрыть
const closePopupOverlay = function () {
  const popupList = document.querySelectorAll('.popup');
  popupList.forEach( (popupElement) => {
    popupElement.addEventListener('mousedown', function (evt) {
      if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
        closePopup(popupElement);
      }
    });
  })
};

closePopupOverlay();

// Создание карточки
const createCard = function(data) {
  const card = new Card(data,'.element-template');
  return card.generateCard();
}

// Добавление карточек на сайт
const cardsContainer = document.querySelector('.elements-grid');

// Добавление карточки
function renderCard(data) {
  cardsContainer.prepend(createCard(data));
}

// Добавление дефолтных карточек
initialCards.forEach(renderCard);

// Попап Редактировать профиль
const popupTypeEditElement = document.querySelector('.popup_type_edit');
const buttonEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// Попап Редактировать профиль форма
const formTypeEditElement = popupTypeEditElement.querySelector('.popup__form');
const nameEdit = formTypeEditElement.querySelector('#input-name');
const descriptionEdit = formTypeEditElement.querySelector('#input-description');

// Попап Новое место
const popupTypeAddElement = document.querySelector('.popup_type_add');
const buttonAdd = document.querySelector('.profile__add-button');

// Попап Новое место форма
const formTypeAddElement = popupTypeAddElement.querySelector('.popup__form');
const inputName = formTypeAddElement.querySelector('.popup__input_type_add-name');
const inputLink = formTypeAddElement.querySelector('.popup__input_type_add-url');

// Отправка формы Редактировать профиль
function formTypeEditSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameEdit.value;
  profileDescription.textContent = descriptionEdit.value;

  closePopup(popupTypeEditElement);
};

// Отправка формы Новое место
function formTypeAddSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({
    name: inputName.value,
    link: inputLink.value
    },);

  closePopup(popupTypeAddElement);

  evt.target.reset();
};

// Обработчик события кнопки Редактировать профиль
buttonEdit.addEventListener('click', function() {
  
  nameEdit.value = profileName.textContent;
  descriptionEdit.value = profileDescription.textContent;

  validatorFormTypeEdit.checkFormManual();

  openPopup(popupTypeEditElement);
});

// Обработчик события кнопки Новое место
buttonAdd.addEventListener('click', function() {

  validatorFormTypeAdd.checkFormManual();

  openPopup(popupTypeAddElement);
});

// Обработчик события отправки формы
formTypeEditElement.addEventListener('submit', formTypeEditSubmitHandler);
formTypeAddElement.addEventListener('submit', formTypeAddSubmitHandler);

// Создание экземпляров класса валидации форм

const validatorFormTypeEdit = new FormValidator(configValidation, formTypeEditElement);
validatorFormTypeEdit.enableValidation();

const validatorFormTypeAdd = new FormValidator(configValidation, formTypeAddElement);
validatorFormTypeAdd.enableValidation();