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
  document.removeEventListener('keydown', closePopupEscape);
};

// Закрытие попапа клавишей Escape
const closePopupEscape = function (event) {
    if (event.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened')
      closePopup(popupOpened);
    }
};

// Закрытие попапа кликом на оверлэй
const closePopupOverlay = function () {
  popupList = document.querySelectorAll('.popup');
  popupList.forEach( (popupElement) => {
    popupElement.addEventListener('mousedown', function (evt) {
      if(evt.target === evt.currentTarget) {
        closePopup(popupElement);
      }
    });
  })
};

closePopupOverlay();

// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
} 

// Добавление карточек на сайт
const cardsContainer = document.querySelector('.elements-grid');
const elementTemplate = document.querySelector('.element-template').content;

const popupTypeImageElement = document.querySelector('.popup_type_image');
const buttonCloseTypeImage = popupTypeImageElement.querySelector('.popup__close');
const popupImage = popupTypeImageElement.querySelector('.popup__image-source');
const popupImageHead = popupTypeImageElement.querySelector('.popup__image-head');

// Функция Добавить карточку, Лайк, Удалить, Просмотр
function addCard(element) {
  const cardListElement = elementTemplate.cloneNode(true);
  const cardImage = cardListElement.querySelector('.element__image');

  cardListElement.querySelector('.element__name').textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  // Отметить лайком картинку
  cardListElement.querySelector('.element__like').addEventListener('click', function(event) {
    event.target.classList.toggle('element__like_active')
  });
  // Удаление карточки кликом на символ мусорки
  cardListElement.querySelector('.element__trash').addEventListener('click', function(event) {
    event.target.closest('.element').remove();
  });
  // Открытие картинки в попапе
  cardListElement.querySelector('.element__image').addEventListener('click', function(event) {
    
    popupImage.src = element.link;
    popupImage.alt = element.name;
    popupImageHead.textContent = element.name;

    openPopup(popupTypeImageElement);
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
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonCloseTypeEdit = popupTypeEditElement.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// Попап Редактировать профиль форма
const formTypeEditElement = popupTypeEditElement.querySelector('.popup__form');
const nameEdit = formTypeEditElement.querySelector('#input-name');
const descriptionEdit = formTypeEditElement.querySelector('#input-description');

// Попап Новое место
const popupTypeAddElement = document.querySelector('.popup_type_add');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonCloseTypeAdd = popupTypeAddElement.querySelector('.popup__close');

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
  });

  closePopup(popupTypeAddElement);

  evt.target.reset();
};

// Обработчик события кнопки Редактировать профиль
buttonEdit.addEventListener('click', function() {

  nameEdit.value = profileName.textContent;
  descriptionEdit.value = profileDescription.textContent;

  openPopup(popupTypeEditElement);
});

// Обработчик события кнопки Новое место
buttonAdd.addEventListener('click', function() {
  openPopup(popupTypeAddElement);
});

// Обработчики события кнопки Закрыть

buttonCloseTypeEdit.addEventListener('click', function() {
  closePopup(popupTypeEditElement);
});

buttonCloseTypeAdd.addEventListener('click', function() {
  closePopup(popupTypeAddElement);
});

buttonCloseTypeImage.addEventListener('click', function() {
  closePopup(popupTypeImageElement);
});

// Обработчик события отправки формы
formTypeEditElement.addEventListener('submit', formTypeEditSubmitHandler);
formTypeAddElement.addEventListener('submit', formTypeAddSubmitHandler);