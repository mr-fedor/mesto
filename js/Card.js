class Card {
  constructor(data, cardSelector){
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate(){
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardElementImg = this._element.querySelector('.card__img');
    this._cardElementImg.src = this._link;
    this._cardElementImg.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners(){
    this._element.querySelector('.card__btn-like').addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.card__btn-trash').addEventListener('click', (evt) => {
      this._trashCard();
    });
  }

  _likeCard(){
    this._element.querySelector('.card__btn-like').classList.toggle('card__btn-like_active');
  }

  _trashCard(){
    this._element.remove();
    this._element = null
  }

}

export {Card};
