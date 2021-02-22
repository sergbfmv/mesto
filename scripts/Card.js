export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._text = data.name
    this._image = data.link
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
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
    this._cardImage = this._element.querySelector('.element__photo')
    this._setEventListeners()

    this._cardImage.src = this._image
    this._cardImage.alt = "Фотография - " + this._text;
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
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._text, this._image)
    })
  }

  _handleRemoveCard() {
    this._element.querySelector('.element__delete-button').closest('.element').remove()
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle('element__like-button_active')
  }
}