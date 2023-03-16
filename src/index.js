import './index.css';

//Импорт классов//
import Card from '../scripts/components/Card.js';
import FormValidator, { settings } from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';

//Импорт переменных//
import {
  popupName, popupDescription, profileAddBtn, profileOpenBtn, profilePopup,
  profileName, profileDescription, popupAddFoto, popupFotoCaption, popupFotoImage,
} from '../scripts/utils/utils.js';

//Создание массива карточек//
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

//Cоздаем новую карточку//
const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
};

const createCard = ({ name, link }) => {
  const card = new Card({ name, link }, '.template__card', handleCardClick);
  return card.generateCard();
};

//Попап просмотр фото//
const popupWithImage = new PopupWithImage('#popup-foto-view');
popupWithImage.setEventListeners();

//Создание экземпляра класса Section//
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  },
}, '.elements__list');

cardsList.renderItems();

//Создание экземпляра класса UserInfo//
const userProfile = new UserInfo({ nameSelector: '.profile__name', infoSelector: '.profile__description' });

//Попап "Редактировать профиль"//
const editProfilePopup = new PopupWithForm({
  popupSelector: '#popup-edit-profile',
  submitInputForm: () => {
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    editProfilePopup.close();
    profilePopupValidator.resetForm();
  }
});
editProfilePopup.setEventListeners();

function openProfilePopup() {
  const userData = userProfile.getUserInfo();
  popupName.value = userData.name;
  popupDescription.value = userData.description;
  editProfilePopup.open();
  profilePopupValidator.resetForm();
}

//Попап "Новое место"//
const addCardPopup = new PopupWithForm({
  popupSelector: '#popup-add-foto',
  submitInputForm: () => {
    const link = popupFotoImage.value;
    const name = popupFotoCaption.value;
    const newCard = { link: link, name: name };
    const newCardInstance = new Card(newCard, '.template__card', handleCardClick);
    const cardElement = newCardInstance.generateCard();
    cardsList.addItem(cardElement);
    addCardPopup.close();
    popupAddFotoValidator.resetForm();
  }
});
addCardPopup.setEventListeners();

function openAddFotoPopup() {
  addCardPopup.open();
  popupFotoCaption.value = '';
  popupFotoImage.value = '';
  popupAddFotoValidator.resetForm();
}

//Слушатели//
profileOpenBtn.addEventListener('click', openProfilePopup);
profileAddBtn.addEventListener('click', openAddFotoPopup);

//Валидация формы "Редактировать профиль"//
const profilePopupValidator = new FormValidator(settings, profilePopup);
profilePopupValidator.enableValidation();

//Валидация формы "Новое место"//
const popupAddFotoValidator = new FormValidator(settings, popupAddFoto);
popupAddFotoValidator.enableValidation();
