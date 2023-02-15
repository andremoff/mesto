//Функция блокировки кнопки//

const toggleButtonState = (submitButton, inactiveButtonClass) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.setAttribute('disabled', true);
};

//Функция разблокировки кнопки//

const unToggleButtonState = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.removeAttribute('disabled');
};

//Валидация формы//

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));

  //Проверка на валидность данных ввода//

  const hasInvalidInput = inputs => {
    return inputs.some(input => {
      return !input.validity.valid;
    });
  };

  //Переключатель кнопки подтверждения//

  const toggleButton = (inputs, submitButton) => {
    if (hasInvalidInput(inputs)) {
      toggleButtonState(submitButton, inactiveButtonClass);
    } else {
      unToggleButtonState(submitButton, inactiveButtonClass);
    }
  };

  //Показываем подчеркивание и сообщение об ошибке//

  const showInputError = (input, errorElement) => {
    input.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = input.validationMessage;
  };

  //Скрываем подчеркивание и сообщение об ошибке//

  const hideInputError = (input, errorElement) => {
    input.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  //Сброс формы от ошибок//

  const resetForm = (form) => {
    const inputElements = Array.from(form.querySelectorAll(inputSelector));
    const errorElements = inputElements.map(input => form.querySelector(`.${input.id}-error`));
    const submitButton = form.querySelector(submitButtonSelector);

    inputElements.forEach((input, index) => {
      hideInputError(input, errorElements[index]);
    });

    unToggleButtonState(submitButton, inactiveButtonClass);
  };

  //Слушатели на поля ввода, кнопки и саму форму//

  const setEventListeners = (form) => {
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    const submitButton = form.querySelector(submitButtonSelector);

    const toggleButtonStateOnInputs = () => {
      toggleButton(inputs, submitButton);
    };

    //Проверка валидности введенных данных//

    const checkInputValidity = (input) => {
      const errorElement = input.closest(formSelector).querySelector(`.${input.id}-error`);
      if (!input.validity.valid) {
        showInputError(input, errorElement);
      } else {
        hideInputError(input, errorElement);
      }
      toggleButtonStateOnInputs();
    };

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(input);
      });
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      toggleButtonState(submitButton, inactiveButtonClass);
      submitButton.setAttribute('disabled', true);
    });

    form.addEventListener('keydown', event => {
      if (event.key === 'Enter' && hasInvalidInput(inputs)) {
        event.preventDefault();
      }
    });
  };

  forms.forEach(form => {
    setEventListeners(form);
  });

  resetForm(forms[0]);
  window.resetForm = resetForm;
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
