export default class UserInfo {
    constructor(nameSelector, aboutSelector, avatarSelector) {
        this._profileName = document.querySelector(nameSelector);
        this._profileAbout = document.querySelector(aboutSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
    }
    
    getUserInfo() {
        return {name: this._profileName.textContent, description: this._profileAbout.textContent};
    }

    setUserInfo({name, about, avatar, _id}) {
        this._profileName.textContent = name;
        this._profileAbout.textContent = about;
        this._profileAvatar.src = avatar;
        this._id = _id;
    }

    getUserId() {
        return this._id;
    }
}