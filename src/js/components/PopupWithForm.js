import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor({popupSelector, handleSubmitForm}){
    super(popupSelector);
    this._popup = document.querySelector(this._popupSelector);
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

  setEventListeners(){
    super.setEventListeners();
    this._formElement.addEventListener('submit', () => {
      this._handleSubmitForm(this._getInputValues());
    });
  }

  _hideErrors(){
    const errors = Array.from(this._formElement.querySelectorAll('.form__item-error'));
    errors.forEach(error => {
      error.classList.remove('form__item-error_active');
    });
  }

  _removeErrorSelectorForInput(){
    const fields = Array.from(this._formElement.querySelectorAll('.form__item'));
    fields.forEach(field => {
      field.classList.remove('form__item_type_error');
    });
  }

  close(){
    super.close();
    this._formElement.reset();
    this._hideErrors();
    this._removeErrorSelectorForInput();

    this._formBtn = this._formElement.querySelector('.form__button');
    this._formBtn.classList.add('form__button_inactive');
    this._formBtn.setAttribute('disabled', 'disabled');
  }
}
