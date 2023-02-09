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

//Попап "Новое место"//

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
  reset(popupAddFoto);
  openPopup(popupAddFoto);
  popupFotoCaption.value = '';
  popupFotoImage.value = '';
}

//Попап "Редактировать профиль"//

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
  document.addEventListener('keydown', handleEscapeKey);
  reset(popup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKey);
  reset(popup);
}

//Единая кнопка закрытия попап//

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//Закрытие через ESC//

function handleEscapeKey(evt) {
  const popups = document.querySelectorAll('.popup_opened');
  if (evt.code === 'Escape' && popups.length > 0) {
    closePopup(popups[0]);
  }
}

//Закрытие Оверлей//

popupOverlays.forEach(function (popupOverlays) {
  popupOverlays.addEventListener('click', function (evt) {
    if (evt.target === popupOverlays) {
      closePopup(popupOverlays);
    }
  });
});

//Функция сброса ошибок в формах//

function reset(popup) {
  const inputSelectors = Array.from(popup.querySelectorAll('.popup__input'));
  inputSelectors.forEach((inputErrorClass) => {
    hideInputError(popup, inputErrorClass);
  });
}

profileOpenBtn.addEventListener('click', openProfilePopup);
profileForm.addEventListener('submit', handleProfileFormSubmit);
profileAddBtn.addEventListener('click', openAddFotoPopup);
popupFormFoto.addEventListener('submit', handleCardFormSubmit);
