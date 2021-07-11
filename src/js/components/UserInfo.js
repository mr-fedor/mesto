export default class UserInfo{
  constructor({nameSelector, statusSelector}){
    this._profileName = document.querySelector(nameSelector);
    this._profileStatus = document.querySelector(statusSelector);
  }

  getUserInfo(){
    return {name: this._profileName.textContent, status: this._profileStatus.textContent};
  }

  setUserInfo({name, status}){
    this._profileName.textContent = name;
    this._profileStatus.textContent = status;
  }
}
