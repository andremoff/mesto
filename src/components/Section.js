export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Принимаем весь массив //
  renderItems(data) {
    data.forEach(item => this._renderer(item));
  }

  // Добавляем переданный элемент в контейнер //
  addItem(element) {
    this._container.prepend(element);
  }
}
