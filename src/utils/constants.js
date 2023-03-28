const popupName = document.querySelector('.popup__input_data_name');
const popupDescription = document.querySelector('.popup__input_data_description');
const profileAddBtn = document.querySelector('.profile__add-button');
const profileOpenBtn = document.querySelector('.profile__btn-modify');
const profilePopup = document.querySelector('#popup-edit-profile');
const popupAvatar = document.querySelector('#popup-edit-useravatar');
const profileEditAvatar = document.querySelector('.profile__btn-avatar');
const popupAddFoto = document.querySelector('#popup-add-foto');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

export {
  popupName, popupDescription, profileAddBtn, profileOpenBtn,
  profilePopup, popupAvatar, profileEditAvatar, popupAddFoto, settings
};
