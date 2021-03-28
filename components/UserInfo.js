export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name)
    this._info = document.querySelector(data.info)
    this._avatar = document.querySelector(data.avatar)
  }

  getUserInfo() {
    return {name: this._name.textContent, info: this._info.textContent, image: this._avatar.src}
  }

  setUserInfo(newName, newInfo, newAvatar) {
    this._name.textContent = newName
    this._info.textContent = newInfo
    if (newAvatar != undefined) {
      this._avatar.src = newAvatar
    }
  }
}