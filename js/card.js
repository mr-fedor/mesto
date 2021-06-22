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

    const cardElementImg = this._element.querySelector('.card__img');
    cardElementImg.src = this._link;
    cardElementImg.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners(){
    this._element.querySelector('.card__btn-like').addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
    this._element.querySelector('.card__btn-trash').addEventListener('click', (evt) => {
      this._trashCard(evt);
    });
  }

  _likeCard(evt){
    evt.target.classList.toggle('card__btn-like_active');
  }

  _trashCard(evt){
    evt.target.closest('.card').remove();
  }

}

export {Card};
