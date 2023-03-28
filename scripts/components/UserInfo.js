export default class UserInfo {
  constructor({ userName, userDescription, userAvatar }) {
    this._userName = document.querySelector(userName);
    this._userDescription = document.querySelector(userDescription);
    this._userAvatar = document.querySelector(userAvatar);
  }

  // Возвращаем объект с данными пользователя //
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent,
      userAvatar: this._userAvatar.src
    };
  }

  // Принимаем новые данные пользователя и добавляем их на страницу //
  setUserInfo(inputValues) {
    this._userName.textContent = inputValues.name;
    this._userDescription.textContent = inputValues.about;
    this._userAvatar.scr = inputValues.avatar;
  }
}
