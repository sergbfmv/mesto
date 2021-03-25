import '../pages/index.css'; // добавьте импорт главного файла стилей 
import Card from '../components/Card.js'
import {initialCards} from '../scripts/array.js'
import {allClasses, FormValidator} from '../components/FormValidator.js'
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
const formElement = popupEdit.querySelector('.popup__form_type_edit')
const elements = document.querySelector('.elements')
const popupAdd = document.querySelector('.popup_type_add')
const addButton = document.querySelector('.profile-columns__add-button')
const title = popupAdd.querySelector('.popup__placeholder_type_title')
const link = popupAdd.querySelector('.popup__placeholder_type_link')
const formAddElement = popupAdd.querySelector('.popup__form_type_add')
const popups = document.querySelectorAll('.popup')
const forms = document.querySelectorAll('.popup__form')
const imagePopup = document.querySelector('.popup_type_image')
const imagePopupPicture = imagePopup.querySelector('.popup__photo')
const imagePopupCaption = imagePopup.querySelector('.popup__title-image')
const submitButton = popupAdd.querySelector('.popup__save-button')
const editAvatar = document.querySelector('.profile__avatar')
const avatarLink = document.querySelector('.popup__placeholder_type_avatar-link')

api.getProfileInfo()
  .then((result) => {
    profileName.textContent = result.name
    profileInfo.textContent = result.about
    profileAvatar.src = result.avatar
})

api.getInitialCards()
  .then((data) => {
    const cardsList = new Section ({
      items: data,
      renderer: (item) => {
        const card = createCard(item)
        const addCard = card.generateCard(item, profileName)
        addCard.querySelector('.element__like-counter').textContent = item.likes.length
        cardsList.addItem(addCard)
      },
    }, '.elements')
  cardsList.renderItems()
})

const confirmPopup = new PopupRemove('.popup_type_remove', () => {
  confirmPopup.close()
}, api)

const editAvatarPopup = new PopupWithForm('.popup_type_edit-avatar', (inputs) => {
  api.changeAvatar(inputs.link)
    .then((data) => {
      profileAvatar.src = data.avatar
    })
    .finally(() => {
      editAvatarPopup.renderLoading(false)
    })
  editAvatarPopup.close()
})

editAvatarPopup.setEventListeners()
editAvatar.addEventListener('click', () => {
  editAvatarPopup.open()
})

function createCard(item) {
  return new Card (item, '.element-template_type_card',  (text, image) => {
    popupImage.open(text, image)
  },confirmPopup, api)
}

forms.forEach((form) => {
	const validator = new FormValidator(allClasses, form)
	validator.enableValidation()
})

const popupImage = new PopupWithImage ('.popup_type_image')
popupImage.setEventListeners()

const addPopup = new PopupWithForm ('.popup_type_add', (placeholders) => {
  const card = createCard(placeholders)
  api.createCard(placeholders)
  .then((data) => {
    const addCard = card.generateCard(data, profileName)
  document.querySelector('.elements').prepend(addCard)
  addPopup.close()
  })
  .finally(() => {
    addPopup.renderLoading(false)
  })
})

addPopup.setEventListeners()
addButton.addEventListener('click', function() {
  addPopup.open()
  submitButton.disabled = true
  submitButton.classList.add('popup__save-button_inactive')
})

const user = new UserInfo ({name: '.profile__title', info: '.profile__subtitle'})

const editPopup = new PopupWithForm ('.popup_type_edit', (placeholders) => {
  user.setUserInfo(placeholders.name, placeholders.info)
  api.editProfileInfo({name: placeholderName.value, about: placeholderInfo.value})
  .finally(() => {
    editPopup.renderLoading(false)
  })
  editPopup.close()
})

editPopup.setEventListeners()
editButton.addEventListener('click', () => {
  editPopup.open()
  placeholderName.value = user.getUserInfo().name
  placeholderInfo.value = user.getUserInfo().info
})