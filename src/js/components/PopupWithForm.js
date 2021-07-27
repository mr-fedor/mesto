import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor({popupElement, handleSubmitForm}){
    super(popupElement);
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
    this._formElement.addEventListener('submit', () => this._handleSubmitForm(this._getInputValues()));
  }

  close(){
    super.close();
    this._formElement.reset();
  }

  renderLoading(isLoading){
    this._popupFormBtn = this._formElement.querySelector('.form__button');
    if(isLoading){
      this._popupDefaultBtnText = this._popupFormBtn.textContent;
      this._popupFormBtn.textContent = 'Сохранение...';
    } else {
      this._popupFormBtn.textContent = this._popupDefaultBtnText;
    }
  }
}
