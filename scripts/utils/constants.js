const popupName = document.querySelector('.popup__input_data_name');
const popupDescription = document.querySelector('.popup__input_data_description');
const profileAddBtn = document.querySelector('.profile__add-button');
const profileOpenBtn = document.querySelector('.profile__btn-modify');
const profilePopup = document.querySelector('#popup-edit-profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupAddFoto = document.querySelector('#popup-add-foto');

export {
  popupName, popupDescription, profileAddBtn, profileOpenBtn, profilePopup, profileName, profileDescription,
  popupAddFoto, initialCards
};

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
