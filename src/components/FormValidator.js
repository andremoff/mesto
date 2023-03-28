export default class FormValidator {
  constructor(settings, formElement) {
    this.data = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this.data.inputSelector));
    this._buttonElement = this._formElement.querySelector(this.data.submitButtonSelector);
  }

  // Показываем подчеркивание и сообщение об ошибке //
  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this.data.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.data.errorClass);
  }

  // Скрываем подчеркивание и сообщение об ошибке //
  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this.data.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this.data.errorClass);
  }

  // Проверка валидности введенных данных //
  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
    this._toggleButtonState();
  }

  // Сброс формы от ошибок //
  resetForm() {
    this._inputList.forEach(inputElement => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      this._hideInputError(inputElement, errorElement);
    });

    this._toggleButtonState();
  }

  // Проверка на валидность данных ввода //
  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  // Переключатель кнопки подтверждения //
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this.data.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this.data.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // Слушатели на поля ввода, кнопки и саму форму //
  _setEventListeners() {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
