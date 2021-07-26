import Popup from "./Popup.js";

export default class PopupWithFormDelete extends Popup{
  constructor({popupSelector, handleSubmitForm}){
    super(popupSelector);
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
}
