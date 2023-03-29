import '../../src/pages/index.css';

// Импорт классов //
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// Импорт переменных //
import {
  popupName, popupDescription, profileAddBtn, profileOpenBtn,
  profilePopup, popupAvatar, profileEditAvatar, popupAddFoto,
} from '../utils/constants.js';
import { settings } from '../utils/constants.js';

// Подключение к серверу //
const api = new Api({
  mainUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '844ed018-969b-42d1-ba36-a0d35313dedc',
    'Content-Type': 'application/json'
  }
});

// Загрузка карточек с сервера //
let userId
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })

// Создание экземпляра класса UserInfo //
const userInfo = new UserInfo({
  userName: '.profile__name',
  userDescription: '.profile__description',
  userAvatar: '.profile__foto'
});

// Создаем попап с подтверждением удаления карточки //
const popupSubmitDelete = new PopupWithSubmit({
  popupSelector: '#popup-submit-delete'
});
popupSubmitDelete.setEventListeners();

// Создаем новую карточку //
const createCard = (item) => {
  const card = new Card({
    item: item,
    cardSelector: '.template__card',
    userId: userId,
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleDeleteClick: (cardId) => {
      popupSubmitDelete.open();
      popupSubmitDelete.setSubmitHandler(() => {
        api.deleteCard(cardId)
          .then(() => {
            popupSubmitDelete.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleAddLike: (cardId) => {
      api.likeCard(cardId)
        .then((item) => {
          card.handleLikeCard(item);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (cardId) => {
      api.removeLike(cardId)
        .then((item) => {
          card.handleLikeCard(item);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
};

// Создание экземпляра класса Section //
const cardsList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  },
}, '.elements__list');

// Попап просмотр фото //
const popupWithImage = new PopupWithImage('#popup-foto-view');
popupWithImage.setEventListeners();

// Попап "Редактировать профиль" //
const popupEditProfile = new PopupWithForm({
  popupSelector: '#popup-edit-profile',
  submitInputForm: (inputValues) => {
    popupEditProfile.loading(true);
    api.changeUserInfo({ name: inputValues.userName, about: inputValues.userDescription })
      .then((userData) => {
        userInfo.setUserInfo({ name: userData.name, about: userData.about });
        popupEditProfile.close();
        profilePopupValidator.resetForm();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditProfile.loading(false);
      });
  }
});
popupEditProfile.setEventListeners();

function openProfilePopup() {
  const userInfoData = userInfo.getUserInfo();
  popupName.value = userInfoData.userName;
  popupDescription.value = userInfoData.userDescription;
  popupEditProfile.open();
  profilePopupValidator.resetForm();
}

// Попап "Редактировать аватар пользователя" //
const popupEditAvatar = new PopupWithForm({
  popupSelector: '#popup-edit-useravatar',
  submitInputForm: (inputValues) => {
    popupEditAvatar.loading(true);
    api.changeAvatar(inputValues)
      .then((userData) => {
        userInfo.setUserInfo({ avatar: userData.avatar });
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupEditAvatar.loading(false);
      });
  }
});
popupEditAvatar.setEventListeners();

function openEditAvatarPopup() {
  popupEditAvatar.open();
  popupEditAvatarValidator.resetForm();
}

// Попап "Новое место" //
const popupAddCard = new PopupWithForm({
  popupSelector: '#popup-add-foto',
  submitInputForm: (inputValues) => {
    api.addCard({ name: inputValues['caption-input'], link: inputValues['foto-input'] })
      .then((newCard) => {
        const cardElement = createCard(newCard);
        cardsList.addItem(cardElement);
        popupAddCard.close();
        popupAddFotoValidator.resetForm();
      })
      .catch((err) => console.log(err));
  }
});
popupAddCard.setEventListeners();

function openAddFotoPopup() {
  popupAddCard.open();
  popupAddFotoValidator.resetForm();
}

// Слушатели //
profileOpenBtn.addEventListener('click', openProfilePopup);
profileAddBtn.addEventListener('click', openAddFotoPopup);
profileEditAvatar.addEventListener('click', openEditAvatarPopup);

// Валидация формы "Редактировать профиль" //
const profilePopupValidator = new FormValidator(settings, profilePopup);
profilePopupValidator.enableValidation();

// Валидация формы "Редактировать аватар пользователя" //
const popupEditAvatarValidator = new FormValidator(settings, popupAvatar);
popupEditAvatarValidator.enableValidation();

// Валидация формы "Новое место" //
const popupAddFotoValidator = new FormValidator(settings, popupAddFoto);
popupAddFotoValidator.enableValidation();
