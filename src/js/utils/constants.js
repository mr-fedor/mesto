export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};

export const cardsListSelector = '.cards';
export const popupWithImageSelector = '.popup_type_image';
export const popupEditProfileSelector = '.popup_type_edit';
export const popupAddCardSelector = '.popup_type_new-card';
export const cardTemplate = '#card';
export const formEditProfileSelector = '.form_type_edit';
export const formAddCardSelector = '.form_type_new-card';
export const btnOpenPopupEdit = document.querySelector('.profile__btn-edit');
export const btnOpenPopupAdd = document.querySelector('.profile__add-btn');
export const profileName = document.querySelector('.profile__name');
export const profileStatus = document.querySelector('.profile__status');
export const nameInput = document.querySelector('#name-input');
export const statusInput = document.querySelector('#status-input');
