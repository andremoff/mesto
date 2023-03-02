// Импорт класса //
import FormValidator, { settings } from './FormValidator.js';
import {
  popupOverlays, profileForm, popupName, popupDescription, profileOpenBtn, profilePopup, profileName, profileDescription,
  popupAddFoto, popupFormFoto, popupFotoCaption, popupFotoImage, closeButtons, cardPlace, popupFotoView, profileAddBtn
} from './utils/utils.js';
import Card from './Card.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Попап "Редактировать профиль"//
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(profilePopup);
  profilePopupValidator.resetForm();
}

function openProfilePopup() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(profilePopup);
  profilePopupValidator.resetForm();
}

//Попап "Новое место"//
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const link = popupFotoImage.value;
  const name = popupFotoCaption.value;
  const newCard = { link: link, name: name };
  const card = new Card(newCard, '.template__card', handleCardClick);
  const cardElement = card.generateCard();
  cardPlace.prepend(cardElement);
  closePopup(popupAddFoto);
  popupAddFotoValidator.resetForm();
}

function openAddFotoPopup() {
  openPopup(popupAddFoto);
  popupFotoCaption.value = '';
  popupFotoImage.value = '';
  popupAddFotoValidator.resetForm();
}

//Попап просмотр фото//
function handleCardClick(name, link) {
  popupFotoImage.src = link;
  popupFotoImage.alt = name;
  popupFotoCaption.textContent = name;
  openPopup(popupFotoView);
}

//Общие функции открытия и закрытия попап окон//
function openPopup(popup) {
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
  popupOverlays.addEventListener('mousedown', function (evt) {
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

//Рендер карточки//
function renderCard(item, cardContainer) {
  const card = new Card(item, '.template__card', handleCardClick);
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
}

//Вызов функции для каждой карточки//
initialCards.forEach(item => renderCard(item, cardPlace));

//Валидация формы "Редактировать профиль"//
const profilePopupValidator = new FormValidator(settings, profilePopup);
profilePopupValidator.enableValidation();

//Валидация формы "Новое место"//
const popupAddFotoValidator = new FormValidator(settings, popupAddFoto);
popupAddFotoValidator.enableValidation();
