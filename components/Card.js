export default class Card {
  constructor(data, cardSelector, handleCardClick, handleTrashClick, id, handleLikeCard, handleDeleteLike) {
    this._text = data.name
    this._image = data.link
    this._id = data._id
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
    this._handleTrashClick = handleTrashClick
    this._handleLikeCard = handleLikeCard
    this._handleDeleteLike = handleDeleteLike
    this._userId = id
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)

    return cardElement
  }

    generateCard(data) {
      this._element = this._getTemplate()

      if(data.owner._id != this._userId) {
        this._element.querySelector(".element__delete-button").style.display = "none"
      }

      if (data.likes.length !== 0) {
        for (let i = 0; i < data.likes.length; i ++) {
          if (data.likes[i]._id === this._userId) {
            this._element.querySelector('.element__like-button').classList.add('element__like-button_active')
          }
        }
      }
      
      this._element.querySelector('.element__like-counter').textContent = data.likes.length
      this._cardImage = this._element.querySelector('.element__photo')
      this._cardTitle = this._element.querySelector('.element__title')
      this._setEventListeners()
      this._cardImage.src = this._image
      this._cardImage.alt = "Фотография - " + this._text
      this._cardTitle.textContent = this._text
      this._newCardId = data._id
      this._likeButton = this._element.querySelector('.element__like-button')

    return this._element
  }

  removeCard() {
    this._element.querySelector('.element__delete-button').closest('.element').remove()
  }

  getId() {
    return this._newCardId
  }

  setLikesInfo(data) {
    this._handleLikeCard()
    this._element.querySelector('.element__like-counter').textContent = data.likes.length
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleTrashClick(this._newCardId, this)
    })
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      if (this._isLiked(evt)) {
        this._handleDeleteLike(this)
      } else {
        this._handleLikeCard(this)
      }
    })
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._text, this._image)
    })
  }

  _handleRemoveCard() {
    this._element.querySelector('.element__delete-button').closest('.element').remove()
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle('element__like-button_active')
  }

  _isLiked(evt) {
    if (evt.target.classList.contains('element__like-button_active')) {
      return true
    } else {
      return false
    }
  }
}