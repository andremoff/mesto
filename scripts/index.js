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
const popupFotoView = document.getElementById('popup-foto-view');
const figureImage = document.querySelector('.popup__figure-image');
const figureCaption = document.querySelector('.popup__figure-caption');
const popupViewOpen = document.querySelector('card__foto');
const cardPlace = document.querySelector('.elements__list');
const templateCard = document.querySelector('.template__card').content;
const closeButtons = document.querySelectorAll('.popup__close');
const popupBtnSaveProfile = document.getElementById('popup__btn-save-profile');

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

//Форма для новой карточки//

function createCard(item) {
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  const cardFoto = cardElement.querySelector('.card__foto');
  const cardTitle = cardElement.querySelector('.card__title');
  cardFoto.src = item.link;
  cardFoto.alt = item.name;
  cardTitle.textContent = item.name;

  //Попап просмотр фото//

  cardFoto.addEventListener('click', openCardFoto);

  function openCardFoto(evt) {
    if (evt.target === cardFoto) {
      figureImage.src = cardFoto.src;
      figureImage.alt = cardTitle.textContent;
      figureCaption.textContent = cardTitle.textContent;
      openPopup(popupFotoView);
    }
  }

  //Удаление//

  const cardBtnDelete = cardElement.querySelector('.card__btn-delete');
  cardBtnDelete.addEventListener('click', deleteCardElement);

  function deleteCardElement(e) {
    e.target.closest('.card').remove();
  }

  //Лайк//

  const heartEnabled = cardElement.querySelector('.card__heart');

  heartEnabled.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__heart_active');
  });

  return cardElement;

}

//Рендор карточек//

function renderCard(item) {
  const cardElement = createCard(item);
  cardPlace.append(cardElement);
}

function render() {
  initialCards.forEach(renderCard);
}

render();

//Попап добавление новой карточки//

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const link = popupFotoImage.value;
  const name = popupFotoCaption.value;
  const newCard = { link: link, name: name };
  const cardElement = createCard(newCard);
  cardPlace.insertBefore(cardElement, cardPlace.firstChild);
  closePopup(popupAddFoto);
  evt.target.reset();
}

function openAddFotoPopup() {
  openPopup(popupAddFoto);
}

//Попап редактирование профиля//

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(profilePopup);
}

function openProfilePopup() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(profilePopup);
  popupBtnSaveProfile.classList.remove('popup__btn-save_inactive');
}

//Общие функции открытия и закрытия попап окон//

function openPopup(popup) {
  popup.classList.add('popup_opened');
  // Удалить сообщения об ошибках//
  const inputSelector = Array.from(popup.querySelectorAll('.popup__input'));
  inputSelector.forEach((inputErrorClass) => {
    hideInputError(popup, inputErrorClass);
  });
  //Очистить форму окна "Новое место"//
  popupFotoCaption.value = '';
  popupFotoImage.value = '';
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Единая кнопка закрытия попап//

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//Закрытие через ESC и Оверлей//

popupOverlays.forEach(function (popupOverlays) {
  popupOverlays.addEventListener('click', function (evt) {
    if (evt.target === popupOverlays) {
      popupOverlays.classList.remove('popup_opened');
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.code === 'Escape') {
      popupOverlays.classList.remove('popup_opened');
    }
  });
});

profileOpenBtn.addEventListener('click', openProfilePopup);
profileForm.addEventListener('submit', handleProfileFormSubmit);
profileAddBtn.addEventListener('click', openAddFotoPopup);
popupFormFoto.addEventListener('submit', handleCardFormSubmit);
