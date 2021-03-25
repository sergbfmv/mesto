export default class Card {
  constructor(data, cardSelector, handleCardClick, popup, api) {
    this._text = data.name
    this._image = data.link
    this._id = data.id
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
    this._popup = popup
    this._api = api
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)

    return cardElement
  }

    generateCard(data, name) {
      this._element = this._getTemplate()
      if(data.owner.name != name.textContent) {
        this._element.querySelector(".element__delete-button").style.display = "none"
      }
      this._id = data._id
      this._cardImage = this._element.querySelector('.element__photo')
      this._setEventListeners()

      this._cardImage.src = this._image
      this._cardImage.alt = "Фотография - " + this._text
      this._element.querySelector('.element__title').textContent = this._text

    return this._element
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._popup.open();
      this._popup.setEventListeners(this._id, this._element)
    })
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      if (evt.target.classList.contains('element__like-button_active')) {
        this._api.deleteLike(this._id)
          .then((data) => {
            this._element.querySelector('.element__like-counter').textContent = data.likes.length - 0 || 1
        })
      } else {
        this._api.addLike(this._id)
          .then((data) => {
          this._element.querySelector('.element__like-counter').textContent = data.likes.length + 0 || 1 
        })
      }
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