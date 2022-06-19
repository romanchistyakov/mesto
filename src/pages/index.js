import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import "./index.css";

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

// Попап Новое место
const popupTypeAddElement = document.querySelector('.popup_type_add');

// Попап Новое место форма
const formTypeAddElement = popupTypeAddElement.querySelector('.popup__form');

// Обработчик события кнопки "Редактировать профиль"
const buttonEdit = document.querySelector('.profile__edit-button');
const popupTypeEditElement = document.querySelector('.popup_type_edit');
const formTypeEditElement = popupTypeEditElement.querySelector('.popup__form');
const nameEdit = formTypeEditElement.querySelector('#input-name');
const descriptionEdit = formTypeEditElement.querySelector('#input-description');
buttonEdit.addEventListener('click', function() {
  
  const userInfoValues = user.getUserInfo();

  nameEdit.value = userInfoValues.name;
  descriptionEdit.value = userInfoValues.description;

  validatorFormUser.checkFormManual();

  formUser.open();
});

// Обработчик события кнопки "Новое место"
const buttonAdd = document.querySelector('.profile__add-button');
buttonAdd.addEventListener('click', function() {

  validatorFormImage.checkFormManual();

  formImage.open();
});

// Создание экземпляров класса валидации форм
const validatorFormUser = new FormValidator(configValidation, formTypeEditElement);
validatorFormUser.enableValidation();

const validatorFormImage = new FormValidator(configValidation, formTypeAddElement);
validatorFormImage.enableValidation();

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListener();

const createCard = (cardItem) => {
  const card = new Card({
    data: cardItem,
    handleCardClick: () => {
      popupImage.open(cardItem);
    },
    templateSelector: '.element-template'});

  return card.generateCard();
};

const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    cardList.addItem(createCard(cardItem));
  }
},'.elements-grid');

cardList.renderItems();

const formImage = new PopupWithForm({
  handleSubmitForm: (formData) => {
    cardList.addItem(createCard(formData));
  },
  popupSelector: '.popup_type_add'
});

formImage.setEventListener();

const user = new UserInfo('.profile__name', '.profile__description');

const formUser = new PopupWithForm({
  handleSubmitForm: (formData) => {
    user.setUserInfo(formData);
  },
  popupSelector: '.popup_type_edit'
});

formUser.setEventListener();