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

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
} 

// Добавление карточек на сайт
const cardsContainer = document.querySelector('.elements-grid');
const elementTemplate = document.querySelector('.element-template').content;

const popupTypeImageElement = document.querySelector('.popup-image');
const closeButtonTypeImage = popupTypeImageElement.querySelector('.popup-image__close');

// Функция Добавить карточку, Лайк, Удалить, Просмотр
function addCard(element) {
  const cardListElement = elementTemplate.cloneNode(true);
  const cardImage = cardListElement.querySelector('.element__image');

  cardListElement.querySelector('.element__name').textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardListElement.querySelector('.element__like').addEventListener('click', function(event) {
    event.target.classList.toggle('element__like_active')
  });

  cardListElement.querySelector('.element__trash').addEventListener('click', function(event) {
    event.target.parentElement.remove();
  });

  cardListElement.querySelector('.element__image').addEventListener('click', function(event) {

    openPopup(popupTypeImageElement);
    
    const popupImage = popupTypeImageElement.querySelector('.popup-image__source');
    popupImage.src = element.link;
    popupImage.alt = element.name;
    popupTypeImageElement.querySelector('.popup-image__head').textContent = element.name;

  });
  
  return cardListElement;
};

// Добавление карточки
function renderCard(createCard) {
  cardsContainer.prepend(addCard(createCard));
}

// Добавление дефолтных карточек
initialCards.forEach(renderCard);

// Попап Редактировать профиль
const popupTypeEditElement = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const closeButtonTypeEdit = popupTypeEditElement.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// Попап Редактировать профиль форма
const formTypeEditElement = document.querySelector('.popup__edit-form');
const editName = formTypeEditElement.querySelector('#input-name');
const editDescription = formTypeEditElement.querySelector('#input-description');
editName.defaultValue = profileName.textContent;
editDescription.defaultValue = profileDescription.textContent;

// Попап Новое место
const popupTypeAddElement = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const closeButtonTypeAdd = popupTypeAddElement.querySelector('.popup__close');

// Попап Новое место форма
const formTypeAddElement = document.querySelector('.popup_type_add');
const inputName = formTypeAddElement.querySelector('.popup__input_type_add-name');
const inputLink = formTypeAddElement.querySelector('.popup__input_type_add-url');

// Отправка формы Редактировать профиль
function formTypeEditSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = editName.value;
  profileDescription.textContent = editDescription.value;

  closePopup(popupTypeEditElement);
};

// Отправка формы Новое место
function formTypeAddSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({
    name: inputName.value,
    link: inputLink.value
  });

  closePopup(popupTypeAddElement);

  inputName.value = '';
  inputLink.value = '';
};

// Обработчик события кнопки Редактировать профиль
editButton.addEventListener('click', function() {
  openPopup(popupTypeEditElement);
});

// Обработчик события кнопки Новое место
addButton.addEventListener('click', function() {
  openPopup(popupTypeAddElement);
});

// Обработчики события кнопки Закрыть

closeButtonTypeEdit.addEventListener('click', function() {
  closePopup(popupTypeEditElement);
});

closeButtonTypeAdd.addEventListener('click', function() {
  closePopup(popupTypeAddElement);
});

closeButtonTypeImage.addEventListener('click', function() {
  closePopup(popupTypeImageElement);
});

// Обработчик события отправки формы
formTypeEditElement.addEventListener('submit', formTypeEditSubmitHandler);
formTypeAddElement.addEventListener('submit', formTypeAddSubmitHandler);