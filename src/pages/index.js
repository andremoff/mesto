import '../../src/index.css';

//Импорт классов//
import Card from '../../scripts/components/Card.js';
import FormValidator, { settings } from '../../scripts/components/FormValidator.js';
import PopupWithForm from '../../scripts/components/PopupWithForm.js';
import PopupWithImage from '../../scripts/components/PopupWithImage.js';
import Section from '../../scripts/components/Section.js';
import UserInfo from '../../scripts/components/UserInfo.js';

// Импорт переменных
import {
  popupName, popupDescription, profileAddBtn, profileOpenBtn, profilePopup,
  popupAddFoto, initialCards
} from '../../scripts/utils/constants.js';

// Создаем новую карточку
const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
};

const createCard = ({ name, link }) => {
  const card = new Card({ name, link }, '.template__card', handleCardClick);
  return card.generateCard();
};

// Попап просмотр фото
const popupWithImage = new PopupWithImage('#popup-foto-view');
popupWithImage.setEventListeners();

// Создание экземпляра класса Section
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  },
}, '.elements__list');

cardsList.renderItems();

// Создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  userName: '.profile__name',
  userDescription: '.profile__description'
});

// Попап "Редактировать профиль" //
const popupEditProfile = new PopupWithForm({
  popupSelector: '#popup-edit-profile',
  submitInputForm: (inputValues) => {
    userInfo.setUserInfo({ name: inputValues.userName, description: inputValues.userDescription });
    popupEditProfile.close();
    profilePopupValidator.resetForm();
  }
});
popupEditProfile.setEventListeners();

function openProfilePopup() {
  const userData = userInfo.getUserInfo();
  popupName.value = userData.userName;
  popupDescription.value = userData.userDescription;
  popupEditProfile.open();
  profilePopupValidator.resetForm();
}

// Попап "Новое место"
const popupAddCard = new PopupWithForm({
  popupSelector: '#popup-add-foto',
  submitInputForm: (inputValues) => {
    const newCard = { name: inputValues['caption-input'], link: inputValues['foto-input'] };
    const cardElement = createCard(newCard);
    cardsList.addItem(cardElement);
    popupAddCard.close();
    popupAddFotoValidator.resetForm();
  }
});
popupAddCard.setEventListeners();

function openAddFotoPopup() {
  popupAddCard.open();
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
