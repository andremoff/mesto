import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitInputForm }) {
    super(popupSelector);
    this._submitInputForm = submitInputForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__btn-save');

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitInputForm();
    });

    this._form.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        if (this._form.checkValidity()) {
          this._submitInputForm();
        }
      }
    });
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
