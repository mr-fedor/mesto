export default class Api {
  constructor(options) {
    this._options = options;
  }

  _getRes(res){
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
    .then(res => this._getRes(res));
  }

  addNewCard(data){
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    }).then(res => this._getRes(res));
  }

  deleteCard(idCard){
    return fetch(`${this._options.baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._options.headers,
    }).then(res => this._getRes(res));
  }

  likeCard(idCard){
    return fetch(`${this._options.baseUrl}/cards/likes/${idCard}`, {
      method: 'PUT',
      headers: this._options.headers,
    }).then(res => this._getRes(res));
  }

  removeLikeCard(idCard){
    return fetch(`${this._options.baseUrl}/cards/likes/${idCard}`, {
      method: 'DELETE',
      headers: this._options.headers,
    }).then(res => this._getRes(res));
  }

  getUserInfo(){
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    }).then(res => this._getRes(res));
  }

  setUserInfo(data){
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.status,
      })
    }).then(res => this._getRes(res));
  }

  setUserAvatar(urlAvatar){
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: urlAvatar
      })
    }).then(res => this._getRes(res));
  }
}
