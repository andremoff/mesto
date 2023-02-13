//Валидация форм//

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));

  const hasInvalidInput = inputs => {
    return inputs.some(input => {
      return !input.validity.valid;
    });
  };

  const toggleButtonState = (inputs, submitButton) => {
    if (hasInvalidInput(inputs)) {
      submitButton.classList.add(inactiveButtonClass);
    } else {
      submitButton.classList.remove(inactiveButtonClass);
    }
  };

  const showInputError = input => {
    const errorElement = input.closest(formSelector).querySelector(`.${input.id}-error`);
    input.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = input.validationMessage;
  };

  const hideInputError = input => {
    const errorElement = input.closest(formSelector).querySelector(`.${input.id}-error`);
    input.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  const checkInputValidity = input => {
    if (!input.validity.valid) {
      showInputError(input);
    } else {
      hideInputError(input);
    }
  };

  const clearForm = form => {
    reset(form);
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    inputs.forEach(input => {
      input.value = '';
    });
  };

  const setEventListeners = form => {
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    const submitButton = form.querySelector(submitButtonSelector);

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(input);
        toggleButtonState(inputs, submitButton);
      });
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      clearForm(form);
    });

    form.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && hasInvalidInput(inputs)) {
        event.preventDefault();
      }
    });
  };

  forms.forEach(form => {
    setEventListeners(form);
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
