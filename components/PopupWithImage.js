import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(text, image) {
    super.open()
    document.querySelector(".popup__photo").src = image
    document.querySelector(".popup__title-image").textContent = text
    document.querySelector(".popup__photo").alt = "Фотография - " + text
    super.setEventListeners()
  }
}