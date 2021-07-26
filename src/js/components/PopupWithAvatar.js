import Popup from "./Popup.js";

export default class PopupWithAvatar extends Popup{
  constructor({popupSelector, handleSubmitForm}){
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popup.querySelector('.form');
  }

  _getInputValues(){
    this._input = this._formElement.querySelector('.form__item');

    return this._input.value;
  }

  setEventListeners(){
    super.setEventListeners();
    this._formElement.addEventListener('submit', () => this._handleSubmitForm(this._getInputValues()));
  }

  close(){
    super.close();
    this._formElement.reset();
  }
}
