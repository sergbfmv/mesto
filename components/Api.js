export default class Api {
  constructor(options) {
    this.url = options.baseUrl
    this.headers = options.headers
  }

  getProfileInfo() {
    return fetch(this.url + '/users/me', {
      headers: this.headers,
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch(err => Promise.reject(err))
  }

  getInitialCards() {
    return fetch(this.url + '/cards', {
      headers: this.headers,
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch(err => Promise.reject(err))
  }

  editProfileInfo(info) {
    return fetch(this.url + '/users/me', {
      method:'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: info.name,
        about: info.about
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch(err => Promise.reject(err))
  }

  createCard(card) {
    return fetch(this.url + '/cards', {
      method:'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch(err => Promise.reject(err))
  }

  removeCard(id) {
    return fetch(`${this.url + '/cards'}/${id}`, {
      method:'DELETE',
      headers: this.headers,
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch(err => Promise.reject(err))
  }

  addLike(id) {
    return fetch(`${this.url + '/cards/likes'}/${id}`, {
      method: 'PUT',
      headers: this.headers,
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch(err => Promise.reject(err))
  }

  deleteLike(id) {
    return fetch(`${this.url + '/cards/likes'}/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch(err => Promise.reject(err))
  }

  changeAvatar(link) {
    return fetch(this.url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch(err => Promise.reject(err))
  }
}