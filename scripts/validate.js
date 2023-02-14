// Функция блокировки кнопки

const toggleButtonState = (submitButton, inactiveButtonClass) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.setAttribute('disabled', true);
};

// Функция разблокировки кнопки

const unToggleButtonState = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.removeAttribute('disabled');
};

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

  //Добавляем подчеркивание и сообщение об ошибке//

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

  //Сброс форм об ошибке//

  const resetForm = form => {
    const inputSelectors = Array.from(form.querySelectorAll('.popup__input'));
    const errorElements = Array.from(form.querySelectorAll('.popup__input-error'));
    inputSelectors.forEach((input, index) => {
      hideInputError(input, errorElements[index]);
    });
    const submitButton = form.querySelector(submitButtonSelector);
    unToggleButtonState(submitButton, inactiveButtonClass);
  };

  //Проверка валидности введенных данных//

  const checkInputValidity = input => {
    const errorElement = input.closest(formSelector).querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
      showInputError(input, errorElement);
    } else {
      hideInputError(input, errorElement);
    }
  };

  //Слушатель на поля ввода, кнопки и самой формы//

  const setEventListeners = form => {
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    const submitButton = form.querySelector(submitButtonSelector);

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(input);
        toggleButton(inputs, submitButton);
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

  //Закрытие окна через ESC//

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
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
