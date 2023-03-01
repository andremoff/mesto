// Импорт класса //
import FormValidator, { settings } from './FormValidator.js';
import Card from './Cards.js';

const profileOpenBtn = document.querySelector('.profile__btn-modify');
const profilePopup = document.getElementById('popup-edit-profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.forms['profile-form'];
const popupOverlays = document.querySelectorAll('.popup');
const popupName = profileForm.querySelector('.popup__input_data_name');
const popupDescription = profileForm.querySelector('.popup__input_data_decription');
const profileAddBtn = document.querySelector('.profile__add-button');
const popupAddFoto = document.getElementById('popup-add-foto');
const popupFormFoto = document.forms['foto-form'];
const popupFotoCaption = popupFormFoto.querySelector('.popup__input_data_caption');
const popupFotoImage = popupFormFoto.querySelector('.popup__input_data_image');
export const popupFotoView = document.getElementById('popup-foto-view');
export const figureImage = document.querySelector('.popup__figure-image');
export const figureCaption = document.querySelector('.popup__figure-caption');
export const cardPlace = document.querySelector('.elements__list');
export const templateCard = document.querySelector('.template__card').content;
const closeButtons = document.querySelectorAll('.popup__close');
const popupBtnSaveProfile = document.getElementById('popup__btn-save-profile');
const popupBtnSaveFoto = document.getElementById('popup__btn-save-foto');

//Попап "Редактировать профиль"//
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(profilePopup);
  formValidatorProfile._resetForm();
}

function openProfilePopup() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(profilePopup);
  popupBtnSaveProfile.classList.remove('popup__btn-save_inactive');
  formValidatorProfile._resetForm();
}

//Попап "Новое место"//
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const link = popupFotoImage.value;
  const name = popupFotoCaption.value;
  const newCard = { link: link, name: name };
  const card = new Card(newCard, '.template__card');
  const cardElement = card.generateCard();
  cardPlace.prepend(cardElement);
  closePopup(popupAddFoto);
  formValidatorFoto._resetForm(popupAddFoto);
}

function openAddFotoPopup() {
  openPopup(popupAddFoto);
  formValidatorFoto._resetForm(popupAddFoto);
  popupBtnSaveFoto.classList.add('popup__btn-save_inactive');
  popupFotoCaption.value = '';
  popupFotoImage.value = '';
}

//Общие функции открытия и закрытия попап окон//
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKey);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKey);
}

//Единая кнопка закрытия попап//
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//Закрытие через Оверлей//
popupOverlays.forEach(function (popupOverlays) {
  popupOverlays.addEventListener('click', function (evt) {
    if (evt.target === popupOverlays) {
      closePopup(popupOverlays);
    }
  });
});

//Закрытие окна через ESC//
function handleEscapeKey(evt) {
  if (evt.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

//Слушатели//
profileOpenBtn.addEventListener('click', openProfilePopup);
profileForm.addEventListener('submit', handleProfileFormSubmit);
profileAddBtn.addEventListener('click', openAddFotoPopup);
popupFormFoto.addEventListener('submit', handleCardFormSubmit);

//Валидация формы "Редактировать профиль"//
const profilePopupValidator = new FormValidator(settings, profilePopup);
const formValidatorProfile = new FormValidator(settings, document.forms['profile-form']);
profilePopupValidator.enableValidation();

//Валидация формы "Новое место"//
const popupAddFotoValidator = new FormValidator(settings, popupAddFoto);
const formValidatorFoto = new FormValidator(settings, document.forms['foto-form']);
popupAddFotoValidator.enableValidation();
