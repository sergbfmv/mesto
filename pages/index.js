import '../pages/index.css'; // добавьте импорт главного файла стилей 
import Card from '../components/Card.js'
import {initialCards} from '../scripts/array.js'
import {allClasses, FormValidator} from '../components/FormValidator.js'
import Section from '../components/Section.js'
import Popup from '../components/Popup.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

const editButton = document.querySelector('.profile__edit-button')
const popupEdit = document.querySelector('.popup_type_edit')
const placeholderName = popupEdit.querySelector('.popup__placeholder_type_name')
const placeholderInfo = popupEdit.querySelector('.popup__placeholder_type_info')
const profileName = document.querySelector('.profile__title')
const profileInfo = document.querySelector('.profile__subtitle')
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

function createCard(item) {
  return new Card (item, '.element-template_type_card',  (text, image) => {
    popupImage.open(text, image)
  }).generateCard()
}

forms.forEach((form) => {
	const validator = new FormValidator(allClasses, form)
	validator.enableValidation()
})

const popupImage = new PopupWithImage ('.popup_type_image')
popupImage.setEventListeners()

const cardsList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item)
    cardsList.addItem(card)
  },
}, '.elements')
cardsList.renderItems()

const addPopup = new PopupWithForm ('.popup_type_add', (placeholders) => {
  const card = createCard(placeholders)
  cardsList.addItemStart(card)
  addPopup.close()
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
  editPopup.close()
})

editPopup.setEventListeners()
editButton.addEventListener('click', () => {
  editPopup.open()
  placeholderName.value = user.getUserInfo().name
  placeholderInfo.value = user.getUserInfo().info
})





/*function addCardStart(card) {
  elements.prepend(card) //добавление карточки в начало
}*/

/*function addCardEnd(item) {
  elements.append(item) // добавляем элемент в конец секции, с изменениями от пользователя
}*/

/*function handleFormSubmit(event) { //форма записывает введенные значения в плейсхолдер и сохраняет
  event.preventDefault()
  profileName.textContent = placeholderName.value
  profileInfo.textContent = placeholderInfo.value
}*/

/*function handleCardFormSubmit(event) {
  event.preventDefault() //сбросить форму
  const addingCard = createCard({name: title.value, link: link.value})
  addCardStart(addingCard)
}*/