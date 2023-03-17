//Класс для создания карточки//
export default class Card {
  constructor(item, cardSelector, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
      this.deleteCard();
    });

    this._heartEnabled.addEventListener('click', () => {
      this._likeCard();
    });

    this._cardFoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _likeCard() {
    this._heartEnabled.classList.toggle('card__heart_active');
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
