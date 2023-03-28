// Класс для создания карточки //
export default class Card {
  constructor({ item, cardSelector, handleCardClick, handleDeleteClick, handleAddLike, handleRemoveLike, userId }) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
    this._userId = userId;
    this._likes = item.likes;
    this._id = item._id;
    this._owner = item.owner;
  }

  // Шаблон карточки из HTML-разметки //
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  // Генерируем новую карточку на основе шаблона //
  generateCard() {
    this._element = this._getTemplate();
    this._cardFoto = this._element.querySelector('.card__foto');
    this._heartEnabled = this._element.querySelector('.card__heart');
    this._cardBtnDelete = this._element.querySelector('.card__btn-delete');
    this._heartCounter = this._element.querySelector('.card__hearts-counter');

    this._cardFoto.src = this._link;
    this._cardFoto.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._heartCounter.textContent = this._likes.length;
    this._checkCardLike();
    this._checkDeleteBtn();

    this._setEventListeners();

    return this._element;
  }

  // Проверяем, была ли карточка лайкнута текущим пользователем //
  _checkCardLike() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._heartEnabled.classList
        .add('card__heart_active');
    }
  }

  // Проверяем, является ли текущий пользователь владельцем карточки //
  _checkDeleteBtn() {
    if (this._userId !== this._owner._id) {
      this._cardBtnDelete.remove();
    }
  }

  // Навешивает обработчики событий на кнопку удаления, лайк и клик на изображение //
  _setEventListeners() {
    this._cardBtnDelete.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });

    this._heartEnabled.addEventListener('click', () => {
      if (this._heartEnabled.classList.contains('card__heart_active')) {
        this._handleRemoveLike(this._id)
      } else {
        this._handleAddLike(this._id)
      }
    });

    this._cardFoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // Обработчик события лайка карточки //
  handleLikeCard(item) {
    this._likes = item.likes;
    this._heartCounter.textContent = this._likes.length;
    this._heartEnabled.classList.toggle('card__heart_active');
  }

  // Удаляет карточку из DOM-дерева //
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
