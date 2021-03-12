export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._closeByEscape = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add('popup_opened') //открытие попап, добавление в плейсхолдер имени
    document.addEventListener('keydown', this._closeByEscape)
  }

  close() {
    this._popup.classList.remove('popup_opened') //удаление попап
    document.removeEventListener('keydown', this._closeByEscape)
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', () => {
      this.close()
    })
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
    })
  }
}