let editButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let closeButton = popup.querySelector('.close-icon')
let placeholderName = popup.querySelector('.popup__placeholder_name')
let placeholderInfo = popup.querySelector('.popup__placeholder_info')
let profileName = document.querySelector('.profile__title')
let profileInfo = document.querySelector('.profile__subtitle')
let formElement = popup.querySelector('.popup__form')

editButton.addEventListener('click', () => {
  popup.classList.add('popup_opened')
  placeholderName.placeholder = profileName.textContent
  placeholderInfo.placeholder = profileInfo.textContent
})

closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened')
})

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    popup.classList.remove('popup_opened')
  }
})

function handleFormSubmit(event) {
  event.preventDefault()
  profileName.textContent = placeholderName.value
  profileInfo.textContent = placeholderInfo.value
  popup.classList.remove('popup_opened')
}

formElement.addEventListener('submit', handleFormSubmit)