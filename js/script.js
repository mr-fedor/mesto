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

// profile text fields
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

// form edit profile
const formEditElement = document.querySelector('.form_type_edit');
const nameInput = formEditElement.querySelector('#name');
const jobInput = formEditElement.querySelector('#status');

// form add new card
const formNewCardElement = document.querySelector('.form_type_new-card');
const titleInput = formNewCardElement.querySelector('#title');
const linkInput = formNewCardElement.querySelector('#link');

// cards
const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;

// figure
const figureTemplate = document.querySelector('#popup-figure').content;

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

function openPopup(popup){
  popup.classList.add('popup_opened');

  if(popup === popupEdit){
    fillFieldFormEdit();
  }
}

function closePopup(popup){
  popup.classList.remove('popup_opened');

  if(popup === popupImg){
    popup.querySelector('.popup__figure').remove();
  }
}

function fillFieldFormEdit(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}

function openPopupImage(popupImg, name, link){
  const figureElement = figureTemplate.querySelector('.popup__figure').cloneNode(true);
  figureElement.querySelector('.popup__image').src = link;
  figureElement.querySelector('.popup__image').alt = name;
  figureElement.querySelector('.popup__caption').textContent = name;

  popupImg.querySelector('.popup__container').append(figureElement);

  openPopup(popupImg);
}

// update name/status from form Edit Profile
function formEditSubmitHandler (evt) {
  evt.preventDefault();

  let statusValue = jobInput.value;
  let nameValue = nameInput.value;

  profileName.textContent = nameValue;
  profileStatus.textContent = statusValue;

  closePopup(popupEdit);
}

// add new card from form
function formNewCardSubmitHandler(evt){
  evt.preventDefault();
  addNewCard(titleInput.value, linkInput.value, 'prepend');

  titleInput.value = '';
  linkInput.value = '';

  closePopup(popupAdd);
}

function addNewCard(name, link, position = 'append'){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__img').src = link;
  cardElement.querySelector('.card__img').alt = name;
  cardElement.querySelector('.card__title').textContent = name;

  if(position === 'append'){
    cards.append(cardElement);
  }

  if(position === 'prepend'){
    cards.prepend(cardElement);
  }

  cardElement.querySelector('.card__img').addEventListener('click', () => openPopupImage(popupImg, name, link));
  cardElement.querySelector('.card__btn-like').addEventListener('click',likeCard);
  cardElement.querySelector('.card__btn-trash').addEventListener('click',trashCard);
}

function likeCard(evt){
  evt.target.classList.toggle('card__btn-like_active');
}

function trashCard(evt){
  evt.target.closest('.card').remove();
}

// add default cards on page
initialCards.forEach((item) => {
  addNewCard(item.name, item.link);
});

// submit forms
formEditElement.addEventListener('submit', formEditSubmitHandler);
formNewCardElement.addEventListener('submit', formNewCardSubmitHandler);

// open popups
btnOpenPopupEdit.addEventListener('click', () => openPopup(popupEdit));
btnOpenPopupAdd.addEventListener('click', () => openPopup(popupAdd));

// close popups
btnClosePopupEdit.addEventListener('click', () => closePopup(popupEdit));
btnClosePopupAdd.addEventListener('click', () => closePopup(popupAdd));
btnClosePopupImg.addEventListener('click', () => closePopup(popupImg));
