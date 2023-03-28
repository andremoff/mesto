import '../../src/index.css';

// Импорт классов //
import Card from '../../scripts/components/Card.js';
import FormValidator, { settings } from '../../scripts/components/FormValidator.js';
import PopupWithForm from '../../scripts/components/PopupWithForm.js';
import PopupWithImage from '../../scripts/components/PopupWithImage.js';
import PopupWithSubmit from '../../scripts/components/PopupWithSubmit';
import Section from '../../scripts/components/Section.js';
import UserInfo from '../../scripts/components/UserInfo.js';
import api from '../../scripts/components/Api';

// Импорт переменных //
import {
  popupName, popupDescription, profileAddBtn, profileOpenBtn,
  profilePopup, popupAvatar, profileEditAvatar, popupAddFoto
} from '../../scripts/utils/constants.js';

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
  api.getUserInfo()
    .then((userData) => {
      popupName.value = userData.name;
      popupDescription.value = userData.about;
      popupEditProfile.open();
      profilePopupValidator.resetForm();
    })
    .catch((err) => console.log(err));
}

// Попап "Редактировать аватар пользователя" //
const popupEditAvatar = new PopupWithForm({
  popupSelector: '#popup-edit-useravatar',
  submitInputForm: (inputValues) => {
    popupEditAvatar.loading(true);
    api.changeAvatar(inputValues)
      .then((userData) => {
        userInfo._userAvatar.src = userData.avatar;
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
