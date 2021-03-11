import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector)
    this._submit = submit
  }

  _getInputValues() {
    return document.querySelectorAll('.popup__placeholder')
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.querySelector('.popup__form').addEventListener('submit', (event) => {
      event.preventDefault()
      this._submit()
    })
  }

  close() {
    document.querySelector('.popup__form_type_add').reset()
    super.close()
  }
}