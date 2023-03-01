import { openPopup, figureImage, figureCaption, cardPlace, popupFotoView } from './index.js';

export const initialCards = [
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

//Класс для создания карточки//
export default class Card {
  constructor(item, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  //Форма для новой карточки//
  generateCard() {
    this._element = this._getTemplate();
    this._cardFoto = this._element.querySelector('.card__foto');
    this._heartEnabled = this._element.querySelector('.card__heart');
    this._cardBtnDelete = this._element.querySelector('.card__btn-delete');

    this._cardFoto.src = this._link;
    this._cardFoto.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._cardBtnDelete.addEventListener('click', () => {
      this._element.remove();
    });

    this._heartEnabled.addEventListener('click', () => {
      this._heartEnabled.classList.toggle('card__heart_active');
    });

    this._cardFoto.addEventListener('click', () => {
      figureImage.src = this._link;
      figureImage.alt = this._name;
      figureCaption.textContent = this._name;
      openPopup(popupFotoView);
    });
  }
}

//Рендер карточек//
function renderCard(item) {
  const card = new Card(item, '.template__card');
  const cardElement = card.generateCard();
  cardPlace.append(cardElement);
}

function render() {
  initialCards.forEach(renderCard);
}

render();
