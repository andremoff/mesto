const openPopup = document.getElementById('profile-edit-button');
const closePopup = document.getElementById('popup__btn-close');
const popup = document.getElementById('popup');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupForm = document.querySelector('.popup__form');
const popupName = popupForm.querySelector('.popup__input_data_name');
const popupDescription = popupForm.querySelector('.popup__input_data_decription');
const profileAddBtn = document.querySelector('.profile__add-button');
const closePopupFoto = document.getElementById('popup__btn-close-foto')
const popupAddFoto = document.getElementById('popup-add-foto');
const popupFormFoto = document.getElementById('popup-form-foto');
const popupFotoCaption = document.querySelector('.popup__input_data_caption');
const popupFotoImage = document.querySelector('.popup__input_data_image');
const popupViewOpen = document.querySelector('card__foto');
const popupViewClose = document.getElementById('popup__btn-close-foto-view');

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

const cardPlace = document.querySelector('.elements__list');
const templateCard = document.querySelector('.template__card').content;

const addCardInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

//Форма для новой карточки//

function AddNewCard() {
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__foto').src = popupFotoImage.value;
  cardElement.querySelector('.card__caption');
  cardElement.querySelector('.card__title').textContent = popupFotoCaption.value;
  cardElement.querySelector('.card__heart');
  cardElement.querySelector('.card__btn-delete');

  cardPlace.prepend(cardElement);

  //Попап просмотр фото//

  const popupFotoView = document.getElementById('popup-foto-view');
  const figureImage = document.querySelector('.popup__figure-image');
  const figureCaption = document.querySelector('.popup__figure-caption');
  const cardFoto = cardElement.querySelector('.card__foto');
  const cardTitle = cardElement.querySelector('.card__title');
  popupViewClose.addEventListener('click', closeFotoViewPopup);
  cardFoto.addEventListener('click', openCardFoto);

  function openCardFoto(evt) {
    if (evt.target === cardFoto) {
      figureImage.src = cardFoto.src;
      figureCaption.textContent = cardTitle.textContent;
      openFotoViewPopup();
    }
  }

  function openFotoViewPopup() {
    popupFotoView.classList.add('popup_opened');
  }

  function closeFotoViewPopup() {
    popupFotoView.classList.remove('popup_opened');
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
}

//Рендор карточек//

function renderCard({ name, link }) {
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__foto').src = link;
  cardElement.querySelector('.card__caption');
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__heart');
  cardElement.querySelector('.card__btn-delete');

  cardPlace.append(cardElement);

  //Попап просмотр фото//

  const popupFotoView = document.getElementById('popup-foto-view');
  const figureImage = document.querySelector('.popup__figure-image');
  const figureCaption = document.querySelector('.popup__figure-caption');
  const cardFoto = cardElement.querySelector('.card__foto');
  const cardTitle = cardElement.querySelector('.card__title');
  popupViewClose.addEventListener('click', closeFotoViewPopup);
  cardFoto.addEventListener('click', openCardFoto);

  function openCardFoto(evt) {
    if (evt.target === cardFoto) {
      figureImage.src = cardFoto.src;
      figureCaption.textContent = cardTitle.textContent;
      openFotoViewPopup();
    }
  }

  function openFotoViewPopup() {
    popupFotoView.classList.add('popup_opened');
  }

  function closeFotoViewPopup() {
    popupFotoView.classList.remove('popup_opened');
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
}

function render() {
  addCardInfo.forEach(renderCard);
}

render();

//Попап добавление новой карточки//

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  AddNewCard();
  popupFotoClose();
  evt.target.reset()
}

function popupAddFotoOpen() {
  popupAddFoto.classList.add('popup_opened');
}

function popupFotoClose() {
  popupAddFoto.classList.remove('popup_opened');
}

//Попап редактирование профиля//

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  popupClose();
}

function popupOpen() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

openPopup.addEventListener('click', popupOpen);
closePopup.addEventListener('click', popupClose);
popupForm.addEventListener('submit', handleFormSubmit);
profileAddBtn.addEventListener('click', popupAddFotoOpen);
closePopupFoto.addEventListener('click', popupFotoClose);
popupFormFoto.addEventListener('submit', handleCardFormSubmit);
