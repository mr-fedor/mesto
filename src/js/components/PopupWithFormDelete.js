import Popup from "./Popup.js";

export default class PopupWithFormDelete extends Popup{
  constructor({popupElement, handleSubmitForm}){
    super(popupElement);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popup.querySelector('.form');
  }

  setEventListeners(){
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleSubmitForm);
  }

  open(card){
    super.open();
    this.card = card;
  }

  renderLoading(isLoading){
    this._popupFormBtn = this._formElement.querySelector('.form__button');
    if(isLoading){
      this._popupDefaultBtnText = this._popupFormBtn.textContent;
      this._popupFormBtn.textContent = 'Удаление...';
    } else {
      // this._popupFormBtn.textContent = this._popupDefaultBtnText;
    }
  }
}
