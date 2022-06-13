import { openPopupImage } from "./popup.js";

export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._cardImage = this._element.querySelector('.element__image');
        this._buttonLike = this._element.querySelector('.element__like');

        this._setEventListener();

        this._element.querySelector('.element__name').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
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
            openPopupImage(this._name, this._link);
        })
    }

    _handleLikeClick() {
        this._buttonLike.classList.toggle('element__like_active');
    }

    _handleTrashClick() {
        this._element.remove();
        this._element = null;
    }

}