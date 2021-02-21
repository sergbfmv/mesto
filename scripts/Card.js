export default class Card {
  constructor(data, cardSelector) {
    this._text = data.name
    this._image = data.link
    this._cardSelector = cardSelector
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)

    return cardElement
  }

    generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners()

    this._element.querySelector('.element__photo').src = this._image
    this._element.querySelector('.element__title').textContent = this._text

    return this._element
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleRemoveCard()
    })
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._handleLikeCard(evt);
    })
    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._handlePopupPhoto()
    })
    document.querySelector('.popup__close-button_type_image').addEventListener('click', () => {
      this._handleClosePopupPhoto()
    })
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this._handleClosePopupPhoto()
      }
    })
    document.querySelector('.popup_type_image').addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this._handleClosePopupPhoto()
      }
    })
  }

  _handleRemoveCard() {
    this._element.querySelector('.element__delete-button').closest('.element').remove()
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle('element__like-button_active')
  }

  _handlePopupPhoto() {
    document.querySelector('.popup_type_image').classList.add('popup_opened')
    document.querySelector('.popup__photo').src = this._image
    document.querySelector('.popup__photo').alt = 'Фотография'
    document.querySelector('.popup__title-image').textContent = this._text
  }

  _handleClosePopupPhoto() {
    document.querySelector('.popup_type_image').classList.remove('popup_opened')
  }
}