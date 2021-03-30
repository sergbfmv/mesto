import Popup from './Popup.js'

export default class PopupRemove extends Popup {
  constructor(popupSelector, submit, api) {
    super(popupSelector)
    this._submit = submit
    this._api = api
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.querySelector('.popup__delete-form').addEventListener('submit', (event) => {
      event.preventDefault()
      this._submit(this._cardId, this._cardElement)
    })
  }

  open(id, element) {
    super.open()
    this._cardId = id
    this._cardElement = element
  }
}