let editButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let closeButton = popup.querySelector('.popup__close-button')
let placeholderName = popup.querySelector('.popup__placeholder_type_name')
let placeholderInfo = popup.querySelector('.popup__placeholder_type_info')
let profileName = document.querySelector('.profile__title')
let profileInfo = document.querySelector('.profile__subtitle')
let formElement = popup.querySelector('.popup__form')

function openPopup() {
  popup.classList.add('popup_opened')
  placeholderName.value = profileName.textContent
  placeholderInfo.value = profileInfo.textContent
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function handleFormSubmit(event) {
  event.preventDefault()
  profileName.textContent = placeholderName.value
  profileInfo.textContent = placeholderInfo.value
  closePopup()
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popup.addEventListener('mouseup', (event) => {
  if (event.target === event.currentTarget) {
    closePopup()
  }
})

formElement.addEventListener('submit', handleFormSubmit)