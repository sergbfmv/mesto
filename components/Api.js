export default class Api {
  constructor(options) {
    this.url = options.baseUrl
    this.headers = options.headers
  }

  _checkStatus(res) {
    if(res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getProfileInfo() {
    return fetch(this.url + '/users/me', {
      headers: this.headers,
    })
    .then(res => 
      this._checkStatus(res)
    )
  }

  getInitialCards() {
    return fetch(this.url + '/cards', {
      headers: this.headers,
    })
    .then(res => 
      this._checkStatus(res)
    )
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
    .then(res => 
      this._checkStatus(res)
    )
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
    .then(res => 
      this._checkStatus(res)
    )
  }

  removeCard(id) {
    return fetch(`${this.url + '/cards'}/${id}`, {
      method:'DELETE',
      headers: this.headers,
    })
    .then(res => 
      this._checkStatus(res)
    )
  }

  addLike(id) {
    return fetch(`${this.url + '/cards/likes'}/${id}`, {
      method: 'PUT',
      headers: this.headers,
    })
    .then(res => 
      this._checkStatus(res)
    )
  }

  deleteLike(id) {
    return fetch(`${this.url + '/cards/likes'}/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(res => 
      this._checkStatus(res)
    )
  }

  changeAvatar(link) {
    return fetch(this.url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => 
      this._checkStatus(res)
    )
  }
}