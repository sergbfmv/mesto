import './index.css'; // добавьте импорт главного файла стилей 
import Card from '../components/Card.js'
import {initialCards} from '../scripts/array.js'
import FormValidator from '../components/FormValidator.js'
import {allClasses} from '../scripts/constants.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import PopupRemove from '../components/PopupRemove.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '7ed380e6-68b3-4cb5-a4fb-d8eaa47229a6',
    'Content-Type': 'application/json'
  }
})
const editButton = document.querySelector('.profile__edit-button')
const popupEdit = document.querySelector('.popup_type_edit')
const placeholderName = popupEdit.querySelector('.popup__placeholder_type_name')
const placeholderInfo = popupEdit.querySelector('.popup__placeholder_type_info')
const profileName = document.querySelector('.profile__title')
const profileInfo = document.querySelector('.profile__subtitle')
const profileAvatar =document.querySelector('.profile__avatar')
const formEdit = popupEdit.querySelector('.popup__form_type_edit')
const elements = document.querySelector('.elements')
const popupAdd = document.querySelector('.popup_type_add')
const addButton = document.querySelector('.profile-columns__add-button')
const title = popupAdd.querySelector('.popup__placeholder_type_title')
const link = popupAdd.querySelector('.popup__placeholder_type_link')
const formAdd = popupAdd.querySelector('.popup__form_type_add')
const popups = document.querySelectorAll('.popup')
const imagePopup = document.querySelector('.popup_type_image')
const imagePopupPicture = imagePopup.querySelector('.popup__photo')
const imagePopupCaption = imagePopup.querySelector('.popup__title-image')
const submitButton = popupAdd.querySelector('.popup__save-button')
const editAvatar = document.querySelector('.profile__avatar')
const avatarLink = document.querySelector('.popup__placeholder_type_avatar-link')
const formAvatar = document.querySelector('.popup__form_type_edit-avatar')
const user = new UserInfo({name: '.profile__title', info: '.profile__subtitle', avatar: '.profile__avatar'})
let userId = ''
let cardsList = ''

const validatorFormAdd = new FormValidator(allClasses, formAdd)
validatorFormAdd.enableValidation()

const validatorFormEdit = new FormValidator(allClasses, formEdit)
validatorFormEdit.enableValidation()

const validatorFormAvatar = new FormValidator(allClasses, formAvatar)
validatorFormAvatar.enableValidation()

const popupImage = new PopupWithImage ('.popup_type_image')
popupImage.setEventListeners()

api.getProfileInfo()
  .then((data) => {
    user.setUserInfo(data.name, data.about, data.avatar)
    userId = data._id
})
  .catch(err => Promise.reject(err))

api.getInitialCards()
  .then((data) => {
     cardsList = new Section({
      items: data,
      renderer: (item) => {
        const card = createCard(item, userId)
        const addCard = card.generateCard(item)
        cardsList.addItem(addCard)
      },
    }, '.elements')
  cardsList.renderItems()
})
.catch(err => Promise.reject(err))

const confirmPopup = new PopupRemove('.popup_type_remove', (id, card) => {
  api.removeCard(id)
    .then((data) => {
      confirmPopup.close()
      card.removeCard()
    })
    .catch(err => Promise.reject(err))
}, api)

const editAvatarPopup = new PopupWithForm('.popup_type_edit-avatar', (inputs) => {
  api.changeAvatar(inputs.link)
    .then((data) => {
      profileAvatar.src = data.avatar
      editAvatarPopup.close()
    })
    .catch(err => Promise.reject(err))
    .finally(() => {
      editAvatarPopup.renderLoading(false)
    })
})

editAvatarPopup.setEventListeners()
editAvatar.addEventListener('click', () => {
  editAvatarPopup.open()
  validatorFormAvatar.disableSubmitButton()
})

function handleLikeCard(card) {
  api.addLike(card.getId())
    .then(data => card.setLikesInfo(data))
    .catch(err => Promise.reject(err));
}

function handleDeleteLike(card) {
  api.deleteLike(card.getId())
    .then(data => card.setLikesInfo(data))
    .catch(err => Promise.reject(err));
} 

function createCard(item, id) {
  return new Card (item, '.element-template_type_card',  (text, image) => {
    popupImage.open(text, image)
  },(id, element, card) => {
    confirmPopup.open()
    confirmPopup.setEventListeners(id, element, card)
  }, id, handleLikeCard, handleDeleteLike)
}

const addPopup = new PopupWithForm ('.popup_type_add', (placeholders) => {
  const card = createCard(placeholders, userId)
  api.createCard(placeholders)
    .then((data) => {
      const addCard = card.generateCard(data)
      cardsList.addItemStart(addCard)
      addPopup.close()
  })
    .catch(err => Promise.reject(err))
    .finally(() => {
      addPopup.renderLoading(false)
  })
})

addPopup.setEventListeners()
addButton.addEventListener('click', function() {
  addPopup.open()
  validatorFormAdd.disableSubmitButton()
})

const editPopup = new PopupWithForm ('.popup_type_edit', (placeholders) => {
  api.editProfileInfo({name: placeholderName.value, about: placeholderInfo.value})
  .then((data) => {
    user.setUserInfo(placeholders.name, placeholders.info)
    editPopup.close()
  })
  .catch(err => Promise.reject(err))
  .finally(() => {
    editPopup.renderLoading(false)
  })
})

editPopup.setEventListeners()
editButton.addEventListener('click', () => {
  editPopup.open()
  placeholderName.value = user.getUserInfo().name
  placeholderInfo.value = user.getUserInfo().info
})