
// Закрытие попапа
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape);
  };

// Закрытие попапа клавишей Escape
export const closePopupEscape = function (event) {
    if (event.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened')
      closePopup(popupOpened);
    }
};

// Открытие попапа
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape);
};

// Открытие попапа Картинки
export const popupTypeImageElement = document.querySelector('.popup_type_image');
const popupImage = popupTypeImageElement.querySelector('.popup__image-source');
const popupImageHead = popupTypeImageElement.querySelector('.popup__image-head');

export const openPopupImage = function(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageHead.textContent = name;
    openPopup(popupTypeImageElement);
}