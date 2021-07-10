export default class UserInfo{
  constructor({name, status}){
    this._name = name;
    this._status = status;
  }

  getUserInfo(){
    return {name: this._name, status: this._status};
  }

  setUserInfo({name, status}){
    this._name = name;
    this._status = status;

    const profileName = document.querySelector('.profile__name');
    const profileStatus = document.querySelector('.profile__status');
    profileName.textContent = this._name;
    profileStatus.textContent = this._status;
  }
}
