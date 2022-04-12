const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let formElement = document.querySelector('.popup__edit-form')
let editName = formElement.querySelector('#input-name');
let editDescription = formElement.querySelector('#input-description');

// Открытие попапа редактирования профиля
function openPopup() {
  popupElement.classList.add('popup_opened');
  editName.defaultValue = profileName.textContent;
  editDescription.defaultValue = profileDescription.textContent;
}

// Закрытие попапа редактирования профиля
function closePopup() {
  popupElement.classList.remove('popup_opened');
}

// Отправка формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = editName.value;
  profileDescription.textContent = editDescription.value;
  closePopup();
}

// Обработчик события кнопки Редактировать профиль
editButton.addEventListener('click', openPopup);

// Обработчик события кнопки Закрыть
closeButton.addEventListener('click', closePopup);

// Обработчик события отправки формы
formElement.addEventListener('submit', formSubmitHandler);