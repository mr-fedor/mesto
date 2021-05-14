/**
 * open/close popup
 */
function openPopup(){
  let popup = document.querySelector('.popup');
  popup.classList.add('popup_opened');

  fillFieldFormEdit();
}

function closePopup(){
  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}

function fillFieldFormEdit(){
  let name = document.querySelector('.profile__name').textContent;
  let status = document.querySelector('.profile__status').textContent;

  let inputName = document.querySelector('#name');
  inputName.value = name;
  let inputStatus = document.querySelector('#status');
  inputStatus.value = status;
}

let btnOpenPopup = document.querySelector('.profile__btn-edit');
btnOpenPopup.addEventListener('click', openPopup);

let btnClosePopup = document.querySelector('.popup__close');
btnClosePopup.addEventListener('click', closePopup);

/**
 * update name/status from form
 */
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#status');

function formSubmitHandler (evt) {
  evt.preventDefault();

  let statusValue = jobInput.value;
  let nameValue = nameInput.value;

  let name = document.querySelector('.profile__name');
  let status = document.querySelector('.profile__status');

  name.textContent = nameValue;
  status.textContent = statusValue;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
