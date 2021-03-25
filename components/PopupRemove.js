import Popup from './Popup.js'

export default class PopupRemove extends Popup {
  constructor(popupSelector, submit, api) {
    super(popupSelector)
    this._submit = submit
    this._api = api
  }

  setEventListeners(id, card) {
    super.setEventListeners()
    this._popup.querySelector('.popup__delete-form').addEventListener('submit', (event) => {
      event.preventDefault()
      this._api.removeCard(id)
      this._submit()
      card.querySelector('.element__delete-button').closest('.element').remove()
    })
  }
}