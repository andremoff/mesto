export default class Api {
  constructor(settings) {
    this._mainUrl = settings.mainUrl;
    this._headers = settings.headers;
  }

  // Проверяем ответ сервера //
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получаем информацию о пользователе //
  getUserInfo() {
    return fetch(`${this._mainUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  // Меняем профиль пользователя //
  changeUserInfo({ name, about }) {
    return fetch(`${this._mainUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
      .then(this._checkResponse);
  }

  // Меняем аватар //
  changeAvatar(inputValues) {
    return fetch(`${this._mainUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputValues.userAvatar
      })
    })
      .then(this._checkResponse);
  }

  // Получаем готовые карточки с сервера //
  getInitialCards() {
    return fetch(`${this._mainUrl}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  // Добавляем карточку //
  addCard({ name, link }) {
    return fetch(`${this._mainUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
      .then(this._checkResponse);
  }

  // Удаляем карточку //
  deleteCard(cardId) {
    return fetch(`${this._mainUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  // Ставим Лайк //
  likeCard(cardId) {
    return fetch(`${this._mainUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  // Убираем лайк //
  removeLike(cardId) {
    return fetch(`${this._mainUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }
}
