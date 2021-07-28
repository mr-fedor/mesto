export default class Popup{
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
  }

  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  _closeOverlay = (evt) => {
    if(evt.target === this._popup){
      this.close();
    }
  }

  setEventListeners(){
    this._popup.querySelector('.popup__close').addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', this._closeOverlay);
  }
}
