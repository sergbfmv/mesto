const editButton = document.querySelector('.profile__edit-button')
const popupEdit = document.querySelector('.popup_type_edit')
const closeButtonEdit = popupEdit.querySelector('.popup__close-button_type_edit')
const placeholderName = popupEdit.querySelector('.popup__placeholder_type_name')
const placeholderInfo = popupEdit.querySelector('.popup__placeholder_type_info')
const profileName = document.querySelector('.profile__title')
const profileInfo = document.querySelector('.profile__subtitle')
const formElement = popupEdit.querySelector('.popup__form_type_edit')
const popupPhoto = document.querySelector('.popup_type_image')
const elements = document.querySelector('.elements')
const elementTemplate = document.querySelector('#element-template').content
const image = popupPhoto.querySelector('.popup__photo')
const text = popupPhoto.querySelector('.popup__title-image')
const popupAdd = document.querySelector('.popup_type_add')
const addButton = document.querySelector('.profile-columns__add-button')
const closeButtonAdd = document.querySelector('.popup__close-button_type_add')
const title = popupAdd.querySelector('.popup__text_type_title')
const link = popupAdd.querySelector('.popup__text_type_link')
const formAddElement = popupAdd.querySelector('.popup__form_type_add')
const closeButtonPhoto = document.querySelector('.popup__close-button_type_image')
const deleteButton = elements.querySelector('.element__delete-button')

function addPlaceholder() {
  placeholderName.value = profileName.textContent
  placeholderInfo.value = profileInfo.textContent
}

function openPopup(popup) {
  popup.classList.add('popup_opened') //открытие попап, добавление в плейсхолдер имени
}

function removeCard(trash) { // вынесенная функция для удаления карточки
  const cardItem = trash.closest('.element') //переменная с ближайшим элементом который нужно удалить
  cardItem.remove() //удаление элемента
}

function createCard(item, itemu) {
  const element = elementTemplate.cloneNode(true) //копирую темплейт для новой карточки

  element.querySelector('.element__photo').src = item.link || itemu.value
  element.querySelector('.element__title').textContent = item.value || item.name
  element.querySelector('.element__photo').alt = 'Фотография'
  
  element.querySelector('.element__like-button').addEventListener('click', function (evt) { //лайк кнопке, обработчик событий
    evt.target.classList.toggle('element__like-button_active')
  })

  const deleteButton = element.querySelector('.element__delete-button') //переменная для кнопки делит
  deleteButton.addEventListener('click', function() {removeCard(deleteButton)})

  const elementPhoto = element.querySelector('.element__photo')
  const elementTitle = element.querySelector('.element__title')

  elementPhoto.addEventListener('click', function() { //попап при клике на фотографию карточки с плавным открытием и закрытием
    openPopup(popupPhoto)
    text.textContent = elementTitle.textContent
    image.src = elementPhoto.src
    image.alt = 'фотография'
  })
  return element
}

function addCardStart(item) {
  elements.prepend(item) //добавление карточки в начало
}

function addCardEnd(item) {
  elements.append(item) // добавляем элемент в конец секции, с изменениями от пользователя
}

initialCards.forEach (card => {
  const additionalCard = createCard(card)
  addCardEnd(additionalCard)
})

function closePopup(popup) { // в скобках любое слово, после в функции при вызове попапа мы указываем в скобках какой именно попап
  popup.classList.remove('popup_opened') //удаление попап
}

function handleFormSubmit(event) { //форма записывает введенные значения в плейсхолдер и сохраняет
  event.preventDefault()
  profileName.textContent = placeholderName.value
  profileInfo.textContent = placeholderInfo.value
  closePopup(popupEdit) //в скобках какой именно попап открыть или закрыть
}

function cardFormSubmit(event) {
  event.preventDefault() //сбросить форму
  addCardStart(createCard(title, link))
  closePopup(popupAdd)
}

editButton.addEventListener('click', function() {
  openPopup(popupEdit)
  addPlaceholder()
})

closeButtonEdit.addEventListener('click', function() {closePopup(popupEdit)})

document.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    closePopup(popupEdit)
  }
})

document.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    closePopup(popupAdd)
  }
})

document.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    closePopup(popupPhoto)
  }
})

addButton.addEventListener('click', function() {
  openPopup(popupAdd)
  title.value = ''
  link.value = ''
})

closeButtonAdd.addEventListener('click', function() {closePopup(popupAdd)})
popupEdit.addEventListener('mouseup', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupEdit)
  }
})

popupAdd.addEventListener('mouseup', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupAdd)
  }
})

popupPhoto.addEventListener('mouseup', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupPhoto)
  }
})

formElement.addEventListener('submit', handleFormSubmit)
formAddElement.addEventListener('submit', cardFormSubmit)
closeButtonPhoto.addEventListener('click', function() {closePopup(popupPhoto)})