const openPopup = document.getElementById('profile-edit-button');
const closePopup = document.getElementById('popup__btn-close');
const popup = document.getElementById('popup');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupForm = document.querySelector('.popup__form');
const popupName = popupForm.querySelector('.popup__input_data_name');
const popupDescription = popupForm.querySelector('.popup__input_data_decription');

function popupOpen() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  popupClose();
}

openPopup.addEventListener('click', popupOpen);
closePopup.addEventListener('click', popupClose);
popupForm.addEventListener('submit', handleFormSubmit);
