const openPopUp = document.getElementById('popup-btn-open');
const closePopUp = document.getElementById('popup__btn-close');
const popUp = document.getElementById('popup');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popUpProfName = document.querySelector('.popup__profile-name');
const popUpProfDesc = document.querySelector('.popup__profile-description');
const profileBtnSubmit = document.querySelector('.popup__btn-save');

openPopUp.addEventListener('click', function(e) {
  e.preventDefault();
  popUp.classList.add('popup__open');
  popUpProfName.value = profileName.textContent;
  popUpProfDesc.value = profileDescription.textContent;
})

closePopUp.addEventListener('click', function(e) {
  e.preventDefault();
  popUp.classList.remove('popup__open');
})

popUp.addEventListener('click', function(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    popUp.classList.remove('popup__open');
  }
})

profileBtnSubmit.addEventListener ('click', function(event) {
  event.preventDefault();
  profileName.textContent = `${popUpProfName.value}`;
  profileDescription.textContent = `${popUpProfDesc.value}`;
  popUp.classList.remove('popup__open');
})

const heartEnabled = document.querySelectorAll('.elements__btn_heart');
for(i=0; i<heartEnabled.length; i++) {
  heartEnabled[i].onclick = heartActive;
}

function heartActive() {
  this.classList.toggle('elements__btn_heart-active');
}
