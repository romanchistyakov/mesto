export default class Card {
    constructor({data, handleCardClick, templateSelector, handleTrashClick, handleLikeClick}) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._handleLikeClick = handleLikeClick;
        this._element = this._getTemplate();
        this._buttonLike = this._element.querySelector('.element__like');
        this._cardLikes = this._element.querySelector('.element__counter');
    }

    getLikes() {
        return this._likes;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    showTrash() {
        this._element.querySelector('.element__trash').classList.add('element__trash_visible');
    }

    toggleLike() {
        this._buttonLike.classList.toggle('element__like_active');
    }

    countLikes(data) {
        this._cardLikes.textContent = data.likes.length;
        this._likes = data.likes;
    }

    generateCard() {
        this._cardImage = this._element.querySelector('.element__image');

        this._setEventListener();

        this._element.querySelector('.element__name').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardLikes.textContent = this._likes.length;

        return this._element;
    }

    _setEventListener() {
        this._buttonLike.addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._handleTrashClick();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    getCardId() {
        return this._id;
    }

    isOwned(userId) {
        return this._ownerId === userId;
    }

    isLiked(userId) {
        return this._likes.some((like) => like._id === userId)
    }

}