const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add('popup__placeholder_type_error')
  errorElement.textContent = errorMessage
  errorElement.classList.add('popup__placeholder-error_active')
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove('popup__placeholder_type_error')
  errorElement.classList.remove('popup__placeholder-error_active')
  errorElement.textContent = ''
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement)
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__placeholder'))
  const buttonElement = formElement.querySelector('.popup__save-button')
  toggleButtonState(inputList, buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
      toggleButtonState(inputList, buttonElement)
    })
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__save-button_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__save-button_inactive');
  }
}; 

const enebleValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListeners(formElement)
  })
}

enebleValidation()

formEditElement.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});

// Вызовем функцию isValid на каждый ввод символа
formEditInput.addEventListener('input', isValid); 