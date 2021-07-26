export const configForms = {
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
export const popupDeleteCardSelector = '.popup_type_delete-card';
export const popupAddAvatarSelector = '.popup_type_add-avatar';

export const cardTemplate = '#card';

export const formEditProfileSelector = '.form_type_edit';
export const formAddCardSelector = '.form_type_new-card';
export const formDeleteCardSelector = '.form_type_delete-card';
export const formEditAvatarSelector = '.form_type_add-avatar';
export const btnOpenPopupEdit = document.querySelector('.profile__btn-edit');
export const btnOpenPopupAdd = document.querySelector('.profile__add-btn');

export const profileNameSelector = '.profile__name';
export const profileStatusSelector = '.profile__status';
export const profileAvatarSelector = '.profile__avatar';

export const btnOpenPopupEditAvatar = document.querySelector('.profile__avatar-edit');

export const nameInput = document.querySelector('#name-input');
export const statusInput = document.querySelector('#status-input');

export const optionsApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'e21e18fa-ab6d-4a3e-87f4-9a2549a22c3a',
    'Content-Type': 'application/json'
  }
};
