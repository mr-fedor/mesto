import '../../pages/index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithFormDelete from '../components/PopupWithFormDelete.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  configForms,
  cardsListSelector,
  popupWithImageSelector,
  popupEditProfileSelector,
  popupAddCardSelector,
  popupDeleteCardSelector,
  popupAddAvatarSelector,
  cardTemplate,
  formEditProfileSelector,
  formAddCardSelector,
  formDeleteCardSelector,
  formEditAvatarSelector,
  btnOpenPopupEdit,
  btnOpenPopupAdd,
  profileNameSelector,
  profileStatusSelector,
  profileAvatarSelector,
  btnOpenPopupEditAvatar,
  nameInput,
  statusInput,
  optionsApi,
} from '../utils/constants.js';

let userId = null;
const userInfo = new UserInfo({nameSelector: profileNameSelector, statusSelector: profileStatusSelector, avatarSelector: profileAvatarSelector});

const api = new Api(optionsApi);
api.getUserInfo().then(res => {
  userInfo.setUserAvatar(res.avatar);
  userInfo.setUserInfo({
    name: res.name,
    status: res.about,
  });
  userId = res._id;
});

const defaultCardList = new Section({
  renderer: (item) => {
    defaultCardList.addItem(createCard(item));
  }
}, cardsListSelector);

api.getInitialCards().then(res => {
  defaultCardList.renderItems(res);
}).catch((err) => {
  console.log(err); // выведем ошибку в консоль
});

const formEditElement = document.querySelector(formEditProfileSelector);
const formNewCardElement = document.querySelector(formAddCardSelector);
const formDeleteCardElement = document.querySelector(formDeleteCardSelector);
const formEditAvatarElement = document.querySelector(formEditAvatarSelector);

const popupImage = new PopupWithImage(popupWithImageSelector);
popupImage.setEventListeners();

const fillFieldFormEdit = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  statusInput.value = userData.status;
};

const popupFormEditProfile = new PopupWithForm({
  popupElement: popupEditProfileSelector,
  handleSubmitForm: (data) => {
    popupFormEditProfile.renderLoading(true);
    api.setUserInfo(data).then(res => {
      userInfo.setUserInfo({name: res.name, status: res.about});
      popupFormEditProfile.close();
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }).finally(() => {
      popupFormEditProfile.renderLoading(false);
    });
  }
});
popupFormEditProfile.setEventListeners();

const popupFormAddCard = new PopupWithForm({
  popupElement: popupAddCardSelector,
  handleSubmitForm: (item) => {
    popupFormAddCard.renderLoading(true);
    api.addNewCard(item).then(res => {
      defaultCardList.addItem(createCard(res), 'prepend');
      popupFormAddCard.close();
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }).finally(() => {
      popupFormAddCard.renderLoading(false);
    });
  },
});
popupFormAddCard.setEventListeners();

const popupFormDeleteCard = new PopupWithFormDelete({
  popupElement: popupDeleteCardSelector,
  handleSubmitForm: () => {
    popupFormDeleteCard.renderLoading(true);
    api.deleteCard(popupFormDeleteCard.card.id).then(res => {
      popupFormDeleteCard.card.trashCard();
      popupFormDeleteCard.close();
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }).finally(() => {
      popupFormDeleteCard.renderLoading(false);
    });
  }
});
popupFormDeleteCard.setEventListeners();

const popupFormEditAvatar = new PopupWithForm({
  popupElement: popupAddAvatarSelector,
  handleSubmitForm: (data) => {
    popupFormEditAvatar.renderLoading(true);
    api.setUserAvatar(data["link-avatar"]).then(res => {
      userInfo.setUserAvatar(res.avatar);
      popupFormEditAvatar.close();
    }).catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }).finally(() => {
      popupFormEditAvatar.renderLoading(false);
    });
  }
});
popupFormEditAvatar.setEventListeners();

const createCard = (item) => {
  const card = new Card(
    {
      data: item,
      currentUserId: userId,
      handleCardClick: () => {
        popupImage.open(item.link, item.name);
      },
      handleOpenPopupDelete: () => {
        popupFormDeleteCard.open(card);
      },
      removeLikeCard: () => {
        api.removeLikeCard(card.id).then(res => {
          card.updateCountLikes(res.likes.length)
        }).catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
      },
      likeCard: () => {
        api.likeCard(card.id).then(res => {
          card.updateCountLikes(res.likes.length)
        }).catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
      },
    },
    cardTemplate,
    );
  return card.generateCard();
}

//validate forms
const formEditProfile = new FormValidator(configForms, formEditElement);
formEditProfile.enableValidation();

const formAddCard = new FormValidator(configForms, formNewCardElement);
formAddCard.enableValidation();

const formDeleteCard = new FormValidator(configForms, formDeleteCardElement);
formDeleteCard.enableValidation();

const formEditAvatar = new FormValidator(configForms, formEditAvatarElement);
formEditAvatar.enableValidation();

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

btnOpenPopupEditAvatar.addEventListener('click', () => {
  formEditAvatar.hideInputErrors();
  formEditAvatar.toggleButtonState();

  popupFormEditAvatar.open();
} );
