export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(element, isAppend) {
        if(isAppend) {
            this._container.append(element);
        }
        else{
            this._container.prepend(element);
        }
    }
}