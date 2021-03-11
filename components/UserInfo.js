export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name)
    this._info = document.querySelector(data.info)
  }

  getUserInfo() {
    return {name: this._name.textContent, info: this._info.textContent}
  }

  setUserInfo(newName, newInfo) {
    this._name.textContent = newName
    this._info.textContent = newInfo
  }
}