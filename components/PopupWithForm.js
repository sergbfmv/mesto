import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector)
    this._submit = submit
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__placeholder')

    this._formValues = {}
    this._inputList.forEach(input => this._formValues[input.name] = input.value)

    return this._formValues
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.querySelector('.popup__form').addEventListener('submit', (event) => {
      event.preventDefault()
      this._submit(this._getInputValues())
    })
  }

  close() {
    super.close()
    this._popup.querySelector('.popup__form').reset()
  }
}