import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(text, image) {
    super.open()
    this._popup.querySelector(".popup__photo").src = image
    this._popup.querySelector(".popup__title-image").textContent = text
    this._popup.querySelector(".popup__photo").alt = "Фотография - " + text
  }
}