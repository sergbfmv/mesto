export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialCards = items
    this._container = document.querySelector(containerSelector)
    this._renderer = renderer
  }

  renderItems() {
    this._initialCards.forEach(item =>
      this._renderer(item)
    )
  }

  addItem(element) {
    this._container.append(element)
  }

  addItemStart(element) {
    this._container.prepend(element)
  }
}