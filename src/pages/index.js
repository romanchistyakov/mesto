import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { configValidation, configApi } from "../utils/constants.js";

import "./index.css";

// Попап Новое место
const popupTypeAddElement = document.querySelector('.popup_type_add');

// Попап Новое место форма
const formTypeAddElement = popupTypeAddElement.querySelector('.popup__form');

const popupTypeEditAvatarElement = document.querySelector('.popup_type_edit-avatar');
const formTypeEditAvatar = popupTypeEditAvatarElement.querySelector('.popup__form');

// Обработчик события кнопки "Редактировать профиль"
const buttonEdit = document.querySelector('.profile__edit-button');
const popupTypeEditElement = document.querySelector('.popup_type_edit');
const formTypeEditElement = popupTypeEditElement.querySelector('.popup__form');
const nameEdit = formTypeEditElement.querySelector('#input-name');
const descriptionEdit = formTypeEditElement.querySelector('#input-description');

const handleButtonEditClick = () => {
  const userInfoValues = user.getUserInfo();
  nameEdit.value = userInfoValues.name;
  descriptionEdit.value = userInfoValues.description;
  validatorFormUser.checkFormManual();
  formUser.open();
}

buttonEdit.addEventListener('click', handleButtonEditClick);

const handleButtonAddClick = () => {
  validatorFormImage.checkFormManual();
  formImage.open();
}

const buttonAdd = document.querySelector('.profile__add-button');
buttonAdd.addEventListener('click', handleButtonAddClick);

const handleButtonEditAvatarClick = () => {
  validatorFormAvatar.checkFormManual();
  formAvatar.open();
}

const buttonEditAvatar = document.querySelector('.profile__edit-avatar');
buttonEditAvatar.addEventListener('click', handleButtonEditAvatarClick);

// Создание экземпляров класса валидации форм
const validatorFormUser = new FormValidator(configValidation, formTypeEditElement);
validatorFormUser.enableValidation();

const validatorFormImage = new FormValidator(configValidation, formTypeAddElement);
validatorFormImage.enableValidation();

const validatorFormAvatar = new FormValidator(configValidation, formTypeEditAvatar);
validatorFormAvatar.enableValidation();

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListener();

const popupConfirmation = new PopupWithConfirmation({popupSelector: '.popup_type_confirmation'});
popupConfirmation.setEventListener();

const createCard = (cardItem) => {
  const userId = user.getUserId();
  const card = new Card({
    data: cardItem,
    handleCardClick: () => {
      popupImage.open(cardItem);
    },
    templateSelector: '.element-template',
    handleTrashClick: () => {
      popupConfirmation.open();
      popupConfirmation.setSubmitHandler({
        handleDeleteImage: () => {
          popupConfirmation.doLoading(true);
          api.deleteCard(card.getCardId())
          .then(() => {
            card.deleteCard();
            popupConfirmation.close();
          })
          .catch(error => console.log(error))
          .finally(() => {
            popupConfirmation.doLoading(false);
          })
        }
      })
      },
    handleLikeClick: () => {
      if(card.isLiked(userId)) {
        api.deleteLike(card.getCardId())
        .then((data) => {
          card.toggleLike();
          card.countLikes(data);
        })
        .catch(error => console.log(error))
      }
      else {
        api.putLike(card.getCardId())
        .then((data => {
          card.toggleLike();
          card.countLikes(data);
        }))
        .catch(error => console.log(error))
      }
    }
  });

  if(card.isLiked(userId)) {
    card.toggleLike();
  }

  if(card.isOwned(userId)) {
    card.showTrash();
  }

  return card.generateCard();
};

const api = new Api(configApi);

const cardList = new Section({
  renderer: (cardItem) => {
    cardList.addItem(createCard(cardItem), true);
  }
},'.elements-grid');

const formImage = new PopupWithForm({
  handleSubmitForm: (formData) => {
    formImage.doLoading(true);
    api.postCard(formData)
    .then((data) => {
      cardList.addItem(createCard(data), false);
      formImage.close();
    })
    .catch(error => console.log(error))
    .finally(() => {
      formImage.doLoading(false);
    })
  },
  popupSelector: '.popup_type_add'
});
formImage.setEventListener();

const user = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');

const formUser = new PopupWithForm({
  handleSubmitForm: (formData) => {
    formUser.doLoading(true);
    api.patchUserInfo(formData)
    .then((data) => {
      user.setUserInfo(data);
      formUser.close();
    })
    .catch(error => console.log(error))
    .finally(() => {
      formUser.doLoading(false);
    })
  },
  popupSelector: '.popup_type_edit'
});
formUser.setEventListener();

const formAvatar = new PopupWithForm({
  handleSubmitForm: (formData) => {
    formAvatar.doLoading(true);
    api.patchUserAvatar(formData)
    .then((data) => {
      user.setUserInfo(data);
      formAvatar.close();
    })
    .catch(error => console.log(error))
    .finally(() => {
      formAvatar.doLoading(false);
    })
  },
  popupSelector: '.popup_type_edit-avatar'
});
formAvatar.setEventListener();

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
.then((values) => {
  const [userData, cardsData] = values;
  user.setUserInfo(userData);
  cardList.renderItems(cardsData);
})
.catch(error => console.log(error))