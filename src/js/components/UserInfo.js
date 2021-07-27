export default class UserInfo{
  constructor({nameSelector, statusSelector, avatarSelector}){
    this._profileName = document.querySelector(nameSelector);
    this._profileStatus = document.querySelector(statusSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo(){
    return {name: this._profileName.textContent, status: this._profileStatus.textContent};
  }

  setUserInfo({name, status}){
    if(name){
      this._profileName.textContent = name;
    }
    if(status){
      this._profileStatus.textContent = status;
    }
  }

  setUserAvatar(imgUrl){
    if(imgUrl){
      this._profileAvatar.src = imgUrl;
    }
  }
}
