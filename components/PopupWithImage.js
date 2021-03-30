import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupCardImage = this._popup.querySelector(".popup__photo")
    this._popupTitleImage = this._popup.querySelector(".popup__title-image")
  }

  open(text, image) {
    super.open()
    this._popupCardImage.src = image
    this._popupTitleImage.textContent = text
    this._popupCardImage.alt = "Фотография - " + text
  }
}