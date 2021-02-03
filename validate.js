const allClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__placeholder',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__placeholder_type_error',
  errorClass: 'popup__placeholder-error_active'
}

const showInputError = (formElement, inputElement, errorMessage, allClasses) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(allClasses.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(allClasses.errorClass)
};

const hideInputError = (formElement, inputElement, allClasses) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(allClasses.inputErrorClass)
  errorElement.classList.remove(allClasses.errorClass)
  errorElement.textContent = ''
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const isValid = (formElement, inputElement, allClasses) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, allClasses);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, allClasses)
  }
}

const setEventListeners = (formElement, allClasses) => {
  const inputList = Array.from(formElement.querySelectorAll(allClasses.inputSelector))
  const buttonElement = formElement.querySelector(allClasses.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, allClasses)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, allClasses)
      toggleButtonState(inputList, buttonElement, allClasses)
    })
  })
}

const toggleButtonState = (inputList, buttonElement, allClasses) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(allClasses.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(allClasses.inactiveButtonClass);
  }
}; 

const enebleValidation = (allClasses) => {
  const formList = Array.from(document.querySelectorAll(allClasses.formSelector))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListeners(formElement, allClasses)
  })
}

enebleValidation(allClasses)