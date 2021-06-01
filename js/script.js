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
const figurePopup = document.querySelector('.popup__figure');

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
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
}

function fillFieldFormEdit(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}

function openPopupImage(popupImg, name, link){
  figurePopup.querySelector('.popup__image').src = link;
  figurePopup.querySelector('.popup__image').alt = name;
  figurePopup.querySelector('.popup__caption').textContent = name;

  openPopup(popupImg);
}

function openPopupEdit(popupEdit) {
  fillFieldFormEdit();
  openPopup(popupEdit)
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
btnOpenPopupEdit.addEventListener('click', () => openPopupEdit(popupEdit));
btnOpenPopupAdd.addEventListener('click', () => openPopup(popupAdd));

// close popups
btnClosePopupEdit.addEventListener('click', () => closePopup(popupEdit));
btnClosePopupAdd.addEventListener('click', () => closePopup(popupAdd));
btnClosePopupImg.addEventListener('click', () => closePopup(popupImg));
