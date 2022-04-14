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

// Добавление карточек на сайт
const elementsList = document.querySelector('.elements-grid');
const elementTemplate = document.querySelector('.element-template').content;

// Функция Добавить карточку, Лайк, Удалить
function addCard(element) {
  const cardListElement = elementTemplate.cloneNode(true);
  cardListElement.querySelector('.element__name').textContent = element.name;
  cardListElement.querySelector('.element__image').src = element.link;
  cardListElement.querySelector('.element__image').alt = element.name;
  elementsList.prepend(cardListElement);

  document.querySelector('.element__like').addEventListener('click', function(event) {
    event.target.classList.toggle('element__like_active')
  });

  document.querySelector('.element__trash').addEventListener('click', function(event) {
    event.target.parentElement.remove();
  });

  document.querySelector('.element__popup-button').addEventListener('click', function(event) {

    const popupTypeImageElement = document.querySelector('.popup-image');
    const closeButtonTypeImage = popupTypeImageElement.querySelector('.popup-image__close');
    const eventTarget = event.target.parentElement;

    popupTypeImageElement.classList.add('popup-image_opened');

    popupTypeImageElement.querySelector('.popup-image__source').src = element.link;
    popupTypeImageElement.querySelector('.popup-image__source').alt = element.name;
    popupTypeImageElement.querySelector('.popup-image__head').textContent = element.name;

    closeButtonTypeImage.addEventListener('click', function() {
      popupTypeImageElement.classList.remove('popup-image_opened');
    });
  });

};

// Добавление дефолтных карточек
initialCards.forEach(addCard);

// Попап Редактировать профиль
const popupTypeEditElement = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const closeButtonTypeEdit = popupTypeEditElement.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

// Попап Редактировать профиль форма
const formElement = document.querySelector('.popup__edit-form');
let editName = formElement.querySelector('#input-name');
let editDescription = formElement.querySelector('#input-description');

// Попап Новое место
const popupTypeAddElement = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const closeButtonTypeAdd = popupTypeAddElement.querySelector('.popup__close');

// Попап Новое место форма
const formTypeAddElement = document.querySelector('.popup_type_add');

// Открытие попапа Редактировать профиль
function openPopupTypeEdit() {
  popupTypeEditElement.classList.add('popup_opened');
  editName.defaultValue = profileName.textContent;
  editDescription.defaultValue = profileDescription.textContent;
}

// Открытие попапа Новое место
function openPopupTypeAdd() {
  popupTypeAddElement.classList.add('popup_opened');
}


// Закрытие попапа Редактировать профиль
function closePopup() {
  popupTypeEditElement.classList.remove('popup_opened');
  popupTypeAddElement.classList.remove('popup_opened');
}

// Отправка формы Редактировать профиль
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = editName.value;
  profileDescription.textContent = editDescription.value;
  closePopup();
}

// Отправка формы Новое место
function formTypeAddSubmitHandler(evt) {
  evt.preventDefault();

  const formTypeAddValue = {
    name: formTypeAddElement.querySelector('.popup__input_type_add-name').value,
    link: formTypeAddElement.querySelector('.popup__input_type_add-url').value
  };

  addCard(formTypeAddValue);

  closePopup();
}

// Обработчик события кнопки Редактировать профиль
editButton.addEventListener('click', openPopupTypeEdit);

// Обработчик события кнопки Новое место
addButton.addEventListener('click', openPopupTypeAdd);

// Обработчик события кнопки Закрыть
closeButtonTypeEdit.addEventListener('click', closePopup);
closeButtonTypeAdd.addEventListener('click', closePopup);

// Обработчик события отправки формы
formElement.addEventListener('submit', formSubmitHandler);
formTypeAddElement.addEventListener('submit', formTypeAddSubmitHandler);