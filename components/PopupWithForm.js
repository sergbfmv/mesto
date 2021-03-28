import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector)
    this._submit = submit
    this._submitButton = this._popup.querySelector('.popup__save-button')
    this._inputList = this._popup.querySelectorAll('.popup__placeholder')
    this._popupForm = this._popup.querySelector('.popup__form') 
  }

  _getInputValues() {
    this._formValues = {}
    this._inputList.forEach(input => this._formValues[input.name] = input.value)

    return this._formValues
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else if (!isLoading) {
      this._submitButton.textContent = 'Сохранить'
    }
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.querySelector('.popup__form').addEventListener('submit', (event) => {
      event.preventDefault()
      this.renderLoading(true)
      this._submit(this._getInputValues())
    })
  }

  close() {
    super.close()
    this._popupForm.reset()
  }
}