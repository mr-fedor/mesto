import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor({popupSelector, handleSubmitForm}){
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popup.querySelector('.form');
  }

  _getInputValues(){
    this._inputList = this._formElement.querySelectorAll('.form__item');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  _handleSubmit(){
    return this._handleSubmitForm(this._getInputValues());
  }

  setEventListeners(){
    super.setEventListeners();
    this._handleSubmitBind = this._handleSubmit.bind(this);
    this._formElement.addEventListener('submit', this._handleSubmitBind);
  }

  close(){
    super.close();
    this._formElement.removeEventListener('submit', this._handleSubmitBind);
    this._formElement.reset();
  }
}
