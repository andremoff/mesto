//Валидация форм//

const hasInvalidInput = (inputSelector) => {
  return inputSelector.some((inputErrorClass) => {
    return !inputErrorClass.validity.valid;
  });
};

const toggleButtonState = (inputSelector, inactiveButtonClass) => {
  if (hasInvalidInput(inputSelector)) {
    inactiveButtonClass.classList.add('popup__btn-save_inactive');
  } else {
    inactiveButtonClass.classList.remove('popup__btn-save_inactive');
  }
};

const showInputError = (formElement, inputErrorClass, errorMessage) => {
  const errorClass = formElement.querySelector(`.${inputErrorClass.id}-error`);
  if (errorClass) {
    inputErrorClass.classList.add('popup__input_type_error');
    errorClass.textContent = errorMessage;
    errorClass.classList.add('popup__input-error_active');
  }
};

const hideInputError = (formElement, inputErrorClass) => {
  const errorClass = formElement.querySelector(`.${inputErrorClass.id}-error`);
  inputErrorClass.classList.remove('popup__input_type_error');
  errorClass.classList.remove('popup__input-error_active');
  errorClass.textContent = '';
};

const checkInputValidity = (formElement, inputErrorClass) => {
  if (!inputErrorClass.validity.valid) {
    showInputError(formElement, inputErrorClass, inputErrorClass.validationMessage);
  } else {
    hideInputError(formElement, inputErrorClass);
  }
};

const setEventListeners = (formElement) => {
  const inputSelector = Array.from(formElement.querySelectorAll('.popup__input'));
  const submitButtonSelector = formElement.querySelector('.popup__btn-save');
  toggleButtonState(inputSelector, submitButtonSelector);

  formElement.addEventListener('submit', (event) => {
    if (hasInvalidInput(inputSelector)) {
      event.preventDefault();
    }
  });

  formElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && hasInvalidInput(inputSelector)) {
      event.preventDefault();
    }
  });

  inputSelector.forEach((inputErrorClass) => {
    inputErrorClass.addEventListener('input', function () {
      checkInputValidity(formElement, inputErrorClass);
      toggleButtonState(inputSelector, submitButtonSelector);
    });
  });
}

const enableValidation = () => {
  const formSelector = Array.from(document.querySelectorAll('.popup__form'));
  formSelector.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(
      formElement.querySelectorAll('.popup__fieldset')
    );
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
