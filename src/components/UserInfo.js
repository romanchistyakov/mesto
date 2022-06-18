export default class UserInfo {
    constructor({name, description}) {
        this._name = name;
        this._description = description;
        this._profileName = document.querySelector('.profile__name');
        this._profileDescription = document.querySelector('.profile__description');
    }
    
    getUserInfo() {
        return {name: this._profileName.textContent, description: this._profileDescription.textContent};
    }

    setUserInfo({name, description}) {
        this._profileName.textContent = name;
        this._profileDescription.textContent = description;
    }
}