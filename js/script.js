/**
 * open/close popup
 */
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#status');

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

let btnOpenPopup = document.querySelector('.profile__btn-edit');
btnOpenPopup.addEventListener('click', openPopup);

let btnClosePopup = document.querySelector('.popup__close');
btnClosePopup.addEventListener('click', closePopup);

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
