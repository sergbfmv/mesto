export {allClasses, FormValidator}

const allClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__placeholder',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__placeholder_type_error',
  errorClass: 'popup__placeholder-error_active'
}

class FormValidator {
  constructor(data, formElement) {
    this._submitButton = formElement.querySelector(data.submitButtonSelector)
    this._inactiveButtonClass = data.inactiveButtonClass
    this._inputErrorClass = data.inputErrorClass
    this._errorClass = data.errorClass
    this._formElement = formElement
    this._inputs = Array.from(formElement.querySelectorAll(data.inputSelector))
  }

  _showInputError(input) {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`)
    input.classList.add(this._inputErrorClass)
    errorElement.textContent = input.validationMessage
    errorElement.classList.add(this._errorClass)
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`)
    input.classList.remove(this._inputErrorClass)
    errorElement.classList.remove(this._errorClass)
    errorElement.textContent = ''
  }

  _isValid(input) {
      if (!input.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        this._showInputError(input)
      } else {
        // Если проходит, скроем
        this._hideInputError(input)
      }
  }

  _hasInvalidInput() {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _toggleButtonState() {
      // Если есть хотя бы один невалидный инпут
      if (this._hasInvalidInput()) {
        // сделай кнопку неактивной
        this._submitButton.classList.add(this._inactiveButtonClass)
        this._submitButton.disabled = true;
      } else {
        // иначе сделай кнопку активной
        this._submitButton.classList.remove(this._inactiveButtonClass)
        this._submitButton.disabled = false
      }
  }

  _setEventListeners() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault()
      this._toggleButtonState()
    })
    this._formElement.addEventListener('reset', () => {
      this._inputs.forEach((inputElement) => {
          this._hideInputError(inputElement)
          this._toggleButtonState()
      })
    })
      this._inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._isValid(inputElement)
          this._toggleButtonState()
      })
    })
  }

  enableValidation() {
    this._toggleButtonState()
    this._setEventListeners()
  }
}

/*const showInputError = (formElement, inputElement, errorMessage, allClasses) => {
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
  toggleButtonState(hasInvalidInput(inputList), buttonElement,allClasses)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, allClasses)
      toggleButtonState(hasInvalidInput(inputList), buttonElement,allClasses)
    })
  })
}

const toggleButtonState = (isInvalidInput, buttonElement, allClasses) => {
  // Если есть хотя бы один невалидный инпут
  if (isInvalidInput) { //такая
    // сделай кнопку неактивной
    buttonElement.classList.add(allClasses.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(allClasses.inactiveButtonClass);
  }
}

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
*/