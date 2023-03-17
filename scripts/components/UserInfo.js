export default class UserInfo {
  constructor({ userName, userDescription }) {
    this._userName = document.querySelector(userName);
    this._userDescription = document.querySelector(userDescription);
  }

  // Возвращает объект с данными пользователя
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent
    };
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(inputValues) {
    this._userName.textContent = inputValues.name;
    this._userDescription.textContent = inputValues.description;
  }
}
