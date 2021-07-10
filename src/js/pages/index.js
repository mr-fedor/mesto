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
  profileName,
  profileStatus,
  nameInput,
  statusInput
} from '../utils/constants.js';

const formEditElement = document.querySelector(formEditProfileSelector);
const formNewCardElement = document.querySelector(formAddCardSelector);
const popupWithImageClass = new PopupWithImage(popupWithImageSelector);
const userInfo = new UserInfo({name: profileName.textContent, status: profileStatus.textContent});

const fillFieldFormEdit = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  statusInput.value = userData.status;
};
fillFieldFormEdit();

const popupFormEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleSubmitForm: (data) => {
    userInfo.setUserInfo(data);
    popupFormEditProfile.close();
    fillFieldFormEdit();
  }
});

const popupFormAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleSubmitForm: (item) => {
    const card = new Card(
      {
        data: item,
        handleCardClick: () => {
          popupWithImageClass.open(item.link, item.name);
        }
      },
      cardTemplate,
      );
    const cardElement = card.generateCard();

    defaultCardList.addItem(cardElement, 'prepend');
    popupFormAddCard.close();
  },
});

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(
      {
        data: item,
        handleCardClick: () => {
          popupWithImageClass.open(item.link, item.name);
        }
      },
      cardTemplate,
      );
    const cardElement = card.generateCard();

    defaultCardList.addItem(cardElement);
  }
}, cardsListSelector);

// add default cards on page
defaultCardList.renderItems();

//validate forms
const formEditProfile = new FormValidator(config, formEditElement);
formEditProfile.enableValidation();

const formAddCard = new FormValidator(config, formNewCardElement);
formAddCard.enableValidation();

//popups open
btnOpenPopupEdit.addEventListener('click', () => popupFormEditProfile.open());
btnOpenPopupAdd.addEventListener('click', () => popupFormAddCard.open());
