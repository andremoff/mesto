import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitInputForm }) {
    super(popupSelector);
    this._submitInputForm = submitInputForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__btn-save');
    this._submitButtonText = this._submitButton.textContent;
  }

  // Возвращаем объект со значениями всех полей формы //
  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  // Обработчики событий закрытия всплывающего окна //
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitInputForm(this._getInputValues());
    });
  }
  // Закрывает всплывающее окно, и сбрасывает значения полей формы //
  close() {
    super.close();
    this._form.reset();
  }
  // Изменяет текст кнопки отправки формы //
  loading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
