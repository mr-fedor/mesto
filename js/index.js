import {Card} from './card.js';
import {FormValidator} from './FormValidator.js';

const initialCards = [
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

const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};

// profile text fields
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

// form edit profile
const formEditElement = document.querySelector('.form_type_edit');
const nameInput = formEditElement.querySelector('#name-input');
const jobInput = formEditElement.querySelector('#status-input');

// form add new card
const formNewCardElement = document.querySelector('.form_type_new-card');
const formNewCardElementBtn = formNewCardElement.querySelector('.form__button')
const titleInput = formNewCardElement.querySelector('#title-input');
const linkInput = formNewCardElement.querySelector('#link-input');

// cards
const cards = document.querySelector('.cards');

// figure
const figurePopup = document.querySelector('.popup__figure');
const figurePopupImg = figurePopup.querySelector('.popup__image');
const figurePopupCaption = figurePopup.querySelector('.popup__caption');

// popups
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');

// popups open btn
const btnOpenPopupEdit = document.querySelector('.profile__btn-edit');
const btnOpenPopupAdd = document.querySelector('.profile__add-btn');

// popups close btn
const btnClosePopupEdit = popupEdit.querySelector('.popup__close');
const btnClosePopupAdd = popupAdd.querySelector('.popup__close');
const btnClosePopupImg = popupImg.querySelector('.popup__close');

const openPopup = (popup) => {
  popup.addEventListener('mousedown', closePopupByOverlay);
  document.addEventListener('keydown', closePopupByEsc);
  popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
  popup.removeEventListener('mousedown', closePopupByOverlay);
  document.removeEventListener('keydown', closePopupByEsc);
  popup.classList.remove('popup_opened');
};

const closePopupByOverlay = (evt) => {
  closePopup(evt.target);
};

const closePopupByEsc = (evt) => {
  evt.preventDefault();
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  };
};

const fillFieldFormEdit = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
};

const openPopupImage = (popupImg, name, link) => {
  figurePopupImg.src = link;
  figurePopupImg.alt = name;
  figurePopupCaption.textContent = name;

  openPopup(popupImg);
};

const openPopupEdit = (popupEdit) => {
  fillFieldFormEdit();
  openPopup(popupEdit);
};

// update name/status from form Edit Profile
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const statusValue = jobInput.value;
  const nameValue = nameInput.value;

  profileName.textContent = nameValue;
  profileStatus.textContent = statusValue;

  closePopup(popupEdit);
};

// add new card from form
const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();

  addNewCard({name: titleInput.value, link: linkInput.value}, 'prepend');

  formNewCardElement.reset();
  formNewCardElementBtn.classList.add('form__button_inactive');
  formNewCardElementBtn.setAttribute('disabled', 'disabled');

  closePopup(popupAdd);
};

const addNewCard = (card, position = 'append') => {
  const cardElement = createCard(card);

  if(position === 'append'){
    cards.append(cardElement);
  };

  if(position === 'prepend'){
    cards.prepend(cardElement);
  };
};

const createCard = (item) => {
  const card = new Card(item, '#card');
  const cardElement = card.generateCard();

  cardElement.querySelector('.card__img').addEventListener('click', () => openPopupImage(popupImg, item.name, item.link));

  return cardElement;
}

// add default cards on page
initialCards.forEach((card) => {
  addNewCard(card);
});

// fill fields form "edit profile"
fillFieldFormEdit();

//validate forms
const enableValidationForms = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const FormValid = new FormValidator(config, formElement);
    return FormValid.enableValidation();
  });
};

enableValidationForms(config);

// submit forms
formEditElement.addEventListener('submit', handleProfileFormSubmit);
formNewCardElement.addEventListener('submit', handleNewCardFormSubmit);

// open popups
btnOpenPopupEdit.addEventListener('click', () => openPopupEdit(popupEdit));
btnOpenPopupAdd.addEventListener('click', () => openPopup(popupAdd));

// close popups
btnClosePopupEdit.addEventListener('click', () => closePopup(popupEdit));
btnClosePopupAdd.addEventListener('click', () => closePopup(popupAdd));
btnClosePopupImg.addEventListener('click', () => closePopup(popupImg));
