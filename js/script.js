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

let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#status');

let btnOpenPopup = document.querySelector('.profile__btn-edit');
let btnClosePopup = document.querySelector('.popup__close');

const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;

function openPopup(){
  popup.classList.add('popup_opened');

  fillFieldFormEdit();
}

function closePopup(){
  popup.classList.remove('popup_opened');
}

function fillFieldFormEdit(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}

/**
 * update name/status from form
 */
function formSubmitHandler (evt) {
  evt.preventDefault();

  let statusValue = jobInput.value;
  let nameValue = nameInput.value;

  profileName.textContent = nameValue;
  profileStatus.textContent = statusValue;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
btnOpenPopup.addEventListener('click', openPopup);
btnClosePopup.addEventListener('click', closePopup);

/**
 * add cards on page
 */
initialCards.forEach((item) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__img').src = item.link;
  cardElement.querySelector('.card__img').alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;
  cards.append(cardElement);
});
