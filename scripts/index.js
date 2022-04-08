const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close');
const saveButton = popupElement.querySelector('.popup__save');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let editName = document.querySelector('.popup__name');
let editDescription = document.querySelector('.popup__description');

function openPopup() {
  popupElement.classList.add('popup_opened');
  editName.defaultValue = profileName.textContent;
  editDescription.defaultValue = profileDescription.textContent;
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

function savePopup() {
  profileName.textContent = editName.value;
  profileDescription.textContent = editDescription.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

saveButton.addEventListener('click', savePopup);