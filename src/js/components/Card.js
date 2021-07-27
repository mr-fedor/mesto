export default class Card {
  constructor({data, currentUserId, handleCardClick, handleOpenPopupDelete, removeLikeCard, likeCard}, cardSelector){
    this.id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._likesCount = data.likes.length;
    this._ownerId = data.owner._id;;
    this._currentUserId = currentUserId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleOpenPopupDelete = handleOpenPopupDelete;
    this._removeLikeCard = removeLikeCard;
    this._likeCard = likeCard;
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

    this._cardElementImg = this._element.querySelector('.card__img');
    this._likeCountElement = this._element.querySelector('.card__count-like');

    this._cardElementImg.src = this._link;
    this._cardElementImg.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    if(!this.isMyCard()){
      this._element.querySelector('.card__btn-trash').remove();
    }

    this.updateCountLikes(this._likesCount);
    if(this._likes.find(item => item._id === this._currentUserId)){
      this._addLikeSelector();
    }

    this._setEventListeners();
    return this._element;
  }

  _addLikeSelector(){
    this._element.querySelector('.card__btn-like').classList.toggle('card__btn-like_active');
  }

  trashCard(){
    this._element.remove();
    this._element = null
  }

  isMyCard(){
    return this._ownerId === this._currentUserId;
  }

  updateCountLikes(countLikes){
    this._likeCountElement.textContent = countLikes;
  }

  _setEventListeners(){
    if(this.isMyCard()){
      this._element.querySelector('.card__btn-trash').addEventListener('click', () => {
        this._handleOpenPopupDelete(this._element);
      });
    }

    this._cardElementImg.addEventListener('click', () => {
      this._handleCardClick(this._element);
    });

    this._btnLike = this._element.querySelector('.card__btn-like');
    this._btnLike.addEventListener('click', () => {
      if(this._btnLike.classList.contains('card__btn-like_active')){
        this._removeLikeCard();
      } else {
        this._likeCard();
      }
      this._addLikeSelector();
    });
  }
}
