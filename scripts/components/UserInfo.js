export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userDescription = document.querySelector(infoSelector);
  }

  // Возвращает объект с данными пользователя
  getUserInfo() {
    const name = this._userName.textContent;
    const description = this._userDescription.textContent;
    return { name, description };
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, description }) {
    if (name && description) {
      this._userName.textContent = name;
      this._userDescription.textContent = description;
    }
  }
}
