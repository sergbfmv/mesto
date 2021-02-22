import Card from './Card.js'
import {initialCards} from './array.js'
import {allClasses, FormValidator} from './FormValidator.js'

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

function addPlaceholder() {
  placeholderName.value = profileName.textContent
  placeholderInfo.value = profileInfo.textContent
}

function closeByEscape(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened') //открытие попап, добавление в плейсхолдер имени
  document.addEventListener('keydown', closeByEscape)
}

function createCard(item) {
  return new Card(item, '.element-template_type_card', handleCardClick).generateCard()
}

function addCardStart(card) {
  elements.prepend(card) //добавление карточки в начало
}

function addCardEnd(item) {
  elements.append(item) // добавляем элемент в конец секции, с изменениями от пользователя
}

function closePopup(popup) { // в скобках любое слово, после в функции при вызове попапа мы указываем в скобках какой именно попап
  popup.classList.remove('popup_opened') //удаление попап
  document.removeEventListener('keydown', closeByEscape)
}

function handleFormSubmit(event) { //форма записывает введенные значения в плейсхолдер и сохраняет
  event.preventDefault()
  profileName.textContent = placeholderName.value
  profileInfo.textContent = placeholderInfo.value
  closePopup(popupEdit) //в скобках какой именно попап открыть или закрыть
}

function handleCardFormSubmit(event) {
  event.preventDefault() //сбросить форму
  const addingCard = createCard({name: title.value, link: link.value})
  addCardStart(addingCard)
  closePopup(popupAdd)
}

function handleCardClick(name, link) {
  imagePopupPicture.src = link
  imagePopupCaption.textContent = name
  openPopup(imagePopup)
}

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  })
})

editButton.addEventListener('click', function() {
  openPopup(popupEdit)
  addPlaceholder()
})

addButton.addEventListener('click', function() {
  openPopup(popupAdd)
  formAddElement.reset()
  submitButton.disabled = true
  submitButton.classList.add('popup__save-button_inactive')
})

forms.forEach((form) => {
	const validator = new FormValidator(allClasses, form)
	validator.enableValidation()
})

formElement.addEventListener('submit', handleFormSubmit)
formAddElement.addEventListener('submit', handleCardFormSubmit)

initialCards.forEach((item) => {
  const cardElement = createCard(item)
  elements.append(cardElement)
})