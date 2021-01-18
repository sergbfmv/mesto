const editButton = document.querySelector('.profile__edit-button')
const popupEdit = document.querySelector('.popup_type_edit')
const closeButtonEdit = popupEdit.querySelector('.popup__close-button_type_edit')
const placeholderName = popupEdit.querySelector('.popup__placeholder_type_name')
const placeholderInfo = popupEdit.querySelector('.popup__placeholder_type_info')
const profileName = document.querySelector('.profile__title')
const profileInfo = document.querySelector('.profile__subtitle')
const formElement = popupEdit.querySelector('.popup__form_type_edit')
const popupPhoto = document.querySelector('.popup_type_image')

function openPopup(popup) {
  popup.classList.add('popup_opened') //открытие попап, добавление в плейсхолдер имени
  placeholderName.value = profileName.textContent
  placeholderInfo.value = profileInfo.textContent
}

function closePopup(popup) { // в скобках любое слово, после в функции при вызове попапа мы указываем в скобках какой именно попап
  popup.classList.remove('popup_opened') //удаление попап
}

function handleFormSubmit(event) { //форма записывает введенные значения в плейсхолдер и сохраняет
  event.preventDefault()
  profileName.textContent = placeholderName.value
  profileInfo.textContent = placeholderInfo.value
  closePopup(popupEdit) //в скобках какой именно попап открыть или закрыть
}

editButton.addEventListener('click', function() {openPopup(popupEdit)});
closeButtonEdit.addEventListener('click', function() {closePopup(popupEdit)});
popupEdit.addEventListener('mouseup', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupEdit)
  }
})

formElement.addEventListener('submit', handleFormSubmit)

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elements = document.querySelector('.elements')
const elementTemplate = document.querySelector('#element-template').content
const image = popupPhoto.querySelector('.popup__photo')
const text = popupPhoto.querySelector('.popup__title-image')

function addCard() {
  initialCards.forEach (card => {
    const element = elementTemplate.cloneNode(true) //копирую темплейт
  
    element.querySelector('.element__title').textContent = card.name //присваиваем имя и ссылку
    element.querySelector('.element__photo').src = card.link

    element.querySelector('.element__like-button').addEventListener('click', function (evt) { //лайк кнопке, обработчик событий
      evt.target.classList.toggle('element__like-button_active')
    })

    const deleteButton = element.querySelector('.element__delete-button') //переменная для кнопки делит
    deleteButton.addEventListener('click', function() { //событие на кнопку
      const cardItem = deleteButton.closest('.element') //переменная с ближайшим элементом который нужно удалить
      cardItem.remove() //удаление элемента
    })

    const popupOpenPhoto = element.querySelector('.element__photo')
    const elementPhoto = element.querySelector('.element__photo')
    const elementTitle = element.querySelector('.element__title')

    popupOpenPhoto.addEventListener('click', function() { //попап при клике на фотографию карточки с плавным открытием и закрытием
      openPopup(popupPhoto)
      image.src = elementPhoto.src;
      text.textContent = elementTitle.textContent;
    });

    elements.append(element) // добавляем элемент в конец секции, с изменениями от пользователя
  })
}

addCard()

const popupAdd = document.querySelector('.popup_type_add')
const addButton = document.querySelector('.profile-columns__add-button')
const closeButtonAdd = document.querySelector('.popup__close-button_type_add')

addButton.addEventListener('click', function() {openPopup(popupAdd)})
closeButtonAdd.addEventListener('click', function() {closePopup(popupAdd)})
popupAdd.addEventListener('mouseup', (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupAdd)
  }
})

const title = popupAdd.querySelector('.popup__text_type_title')
const link = popupAdd.querySelector('.popup__text_type_link')
const formAddElement = popupAdd.querySelector('.popup__form_type_add')

function cardFormSubmit(event) {
  event.preventDefault() //сбросить форму

  const element = elementTemplate.cloneNode(true) //копирую темплейт для новой карточки

  element.querySelector('.element__like-button').addEventListener('click', function (evt) { //лайк кнопке, обработчик событий
    evt.target.classList.toggle('element__like-button_active')
  })

  const deleteButton = element.querySelector('.element__delete-button') //переменная для кнопки делит
  deleteButton.addEventListener('click', function() { //событие на кнопку
    const cardItem = deleteButton.closest('.element') //переменная с ближайшим элементом который нужно удалить
    cardItem.remove() //удаление элемента
  })

  element.querySelector('.element__title').textContent = title.value //значения из формы вносятся в название новой карточки
  element.querySelector('.element__photo').src = link.value //ссылка записывается в карточку

  
  const popupOpenPhoto = element.querySelector('.element__photo')
  const elementPhoto = element.querySelector('.element__photo')
  const elementTitle = element.querySelector('.element__title')

  popupOpenPhoto.addEventListener('click', function() { //попап при клике на фотографию карточки с плавным открытием и закрытием
    openPopup(popupPhoto)
    image.src = elementPhoto.src;
    text.textContent = elementTitle.textContent;
  });

  elements.prepend(element) //добавление карточки в начало

  closePopup(popupAdd)
}

formAddElement.addEventListener('submit', cardFormSubmit); //при нажатии на кнопку добавить срабатывает функция добавления карточки

const closeButtonPhoto = document.querySelector('.popup__close-button_type_image')

closeButtonPhoto.addEventListener('click', function() {closePopup(popupPhoto)})