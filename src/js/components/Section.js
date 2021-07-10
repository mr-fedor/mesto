export default class Section{
  constructor({items, renderer}, containerSelector){
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item, position = 'append'){
    if(position === 'append'){
      this._container.append(item);
    }
    if(position === 'prepend'){
      this._container.prepend(item);
    }
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}
