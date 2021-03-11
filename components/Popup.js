export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  open() {
    this._popup.classList.add('popup_opened') //открытие попап, добавление в плейсхолдер имени
    /*document.removeEventListener('keydown', closeByEscape)*/
  }

  close() {
    this._popup.classList.remove('popup_opened') //удаление попап
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
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    })
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
    })
  }
}