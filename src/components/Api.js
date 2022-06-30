export default class Api {
    constructor(configApi) {
        this._url = configApi.url;
        this._token = configApi.token;
    }

    _fetchRoutine = (res) => {
        if(res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
              authorization: this._token
            }
        })
        .then(this._fetchRoutine)
    }

    postCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(this._fetchRoutine)
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            }
        })
        .then(this._fetchRoutine)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then(this._fetchRoutine)
    }

    patchUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(this._fetchRoutine)
    }

    patchUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(this._fetchRoutine)
    }

    putLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
        })
        .then(this._fetchRoutine)
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
        })
        .then(this._fetchRoutine)
    }

    getLikes(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            headers: {
                authorization: this._token
            }
        })
        .then(this._fetchRoutine)
    }
}


