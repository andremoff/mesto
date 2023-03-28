import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  // Функция обратного вызова при отправке формы //
  setSubmitHandler(submitHandler) {
    this._submitHandler = submitHandler;
  }

  // Подтверждение удаления карточки по нажатию на submit //
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler();
    });
  }
}
