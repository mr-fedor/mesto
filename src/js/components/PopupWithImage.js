import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
  }

  open(link, name){
    this._figurePopupImg = this._popup.querySelector('.popup__image');
    this._figurePopupCaption = this._popup.querySelector('.popup__caption')

    this._figurePopupImg.src = link;
    this._figurePopupImg.alt = name;
    this._figurePopupCaption.textContent = name;

    super.open();
  }
}
