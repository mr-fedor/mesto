import '../../pages/index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  config,
  cardsListSelector,
  popupWithImageSelector,
  popupEditProfileSelector,
  popupAddCardSelector,
  cardTemplate,
  formEditProfileSelector,
  formAddCardSelector,
  btnOpenPopupEdit,
  btnOpenPopupAdd,
  profileNameSelector,
  profileStatusSelector,
  nameInput,
  statusInput
} from '../utils/constants.js';

const formEditElement = document.querySelector(formEditProfileSelector);
const formNewCardElement = document.querySelector(formAddCardSelector);
const popupWithImageClass = new PopupWithImage(popupWithImageSelector);
popupWithImageClass.setEventListeners();
const userInfo = new UserInfo({nameSelector: profileNameSelector, statusSelector: profileStatusSelector});

const fillFieldFormEdit = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  statusInput.value = userData.status;
};

const popupFormEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleSubmitForm: (data) => {
    userInfo.setUserInfo(data);
    popupFormEditProfile.close();
  }
});
popupFormEditProfile.setEventListeners();

const popupFormAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleSubmitForm: (item) => {
    defaultCardList.addItem(createCard(item), 'prepend');
    popupFormAddCard.close();
  },
});
popupFormAddCard.setEventListeners();

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    defaultCardList.addItem(createCard(item));
  }
}, cardsListSelector);

const createCard = (item) => {
  const card = new Card(
    {
      data: item,
      handleCardClick: () => {
        popupWithImageClass.open(item.link, item.name);
      }
    },
    cardTemplate,
    );
  return card.generateCard();
}

// add default cards on page
defaultCardList.renderItems();

//validate forms
const formEditProfile = new FormValidator(config, formEditElement);
formEditProfile.enableValidation();

const formAddCard = new FormValidator(config, formNewCardElement);
formAddCard.enableValidation();

//popups open
btnOpenPopupEdit.addEventListener('click', () => {
  fillFieldFormEdit();

  formEditProfile.hideInputErrors();
  formEditProfile.toggleButtonState();

  popupFormEditProfile.open();
});

btnOpenPopupAdd.addEventListener('click', () => {
  formAddCard.hideInputErrors();
  formAddCard.toggleButtonState();

  popupFormAddCard.open();
});
