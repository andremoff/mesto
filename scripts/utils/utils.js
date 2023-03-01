const popupOverlays = document.querySelectorAll('.popup');
const profileForm = document.forms['profile-form'];
const popupName = profileForm.querySelector('.popup__input_data_name');
const popupDescription = profileForm.querySelector('.popup__input_data_decription');
const profileAddBtn = document.querySelector('.profile__add-button');
const profileOpenBtn = document.querySelector('.profile__btn-modify');
const profilePopup = document.getElementById('popup-edit-profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupAddFoto = document.getElementById('popup-add-foto');
const popupFormFoto = document.forms['foto-form'];
const popupFotoCaption = popupFormFoto.querySelector('.popup__input_data_caption');
const popupFotoImage = popupFormFoto.querySelector('.popup__input_data_image');
const popupFotoView = document.getElementById('popup-foto-view');
const figureImage = document.querySelector('.popup__figure-image');
const figureCaption = document.querySelector('.popup__figure-caption');
const closeButtons = document.querySelectorAll('.popup__close');
const cardPlace = document.querySelector('.elements__list');

export {
  popupOverlays, profileForm, popupName, popupDescription, profileAddBtn, profileOpenBtn, profilePopup, profileName, profileDescription,
  popupAddFoto, popupFormFoto, popupFotoCaption, popupFotoImage, popupFotoView, figureImage, figureCaption, closeButtons, cardPlace
};
