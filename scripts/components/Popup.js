export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');
    this._handleEscapeKey = this._handleEscapeKey.bind(this);
  }

  // Открывает всплывающее окно //
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscapeKey);
  }

  // Закрывает всплывающее окно //
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscapeKey);
  }

  // Закрытие через ESC //
  _handleEscapeKey(evt) {
    if (evt.code === 'Escape') {
      this.close();
    }
  }

  // Закрытия всплывающего окна через оверлей //
  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}
