export class HandleEvents {
    constructor(saveFavoritebuttons, updateImagesButton, uploadImageButton, inputElement, loadCat, formData) {
        this.saveFavoritebuttons = saveFavoritebuttons;
        this.updateImagesButton = updateImagesButton;
        this.uploadImageButton = uploadImageButton;
        this.inputElement = inputElement;
        this.loadCat = loadCat;
        this.formData = formData;
        this.run = (loadCat) => {
            this.loadCat = loadCat;
            this.updateRandomButton();
            this.uploadButton();
            this.getFormData();
        };
        this.deleteFavoriteBack = (button, catId) => {
            button.addEventListener("click", () => { var _a; return (_a = this.loadCat) === null || _a === void 0 ? void 0 : _a.deleteFavorite(catId); });
        };
        this.deleteFavoriteFront = (element) => {
            const button = element.querySelector("button");
            button === null || button === void 0 ? void 0 : button.addEventListener("click", () => {
                element.remove();
            });
        };
        this.saveButtons = (catIds) => {
            catIds.forEach((catId, index) => {
                const saveButton = this.saveFavoritebuttons[index];
                saveButton.onclick = () => { var _a; return (_a = this.loadCat) === null || _a === void 0 ? void 0 : _a.saveOnFavorites(catId); };
            });
        };
        this.fillThumbnail = () => {
            var _a, _b, _c;
            const file = (_a = this.formData) === null || _a === void 0 ? void 0 : _a.get("file");
            const newFile = file;
            (_b = this.loadCat) === null || _b === void 0 ? void 0 : _b.reader.readAsDataURL(newFile);
            (_c = this.loadCat) === null || _c === void 0 ? void 0 : _c.reader.addEventListener("load", () => {
                var _a;
                (_a = this.loadCat) === null || _a === void 0 ? void 0 : _a.domHandlers[1].createThumbnail();
            });
        };
        this.getFormData = () => {
            const input = this.inputElement;
            input.addEventListener("input", () => {
                var _a;
                const newForm = (_a = this.loadCat) === null || _a === void 0 ? void 0 : _a.domHandlers[1].form;
                this.formData = new FormData(newForm);
                this.fillThumbnail();
            });
        };
        this.updateRandomButton = () => {
            if (this.updateImagesButton !== null && this.loadCat !== undefined) {
                this.updateImagesButton.onclick = this.loadCat.showRandom;
            }
        };
        this.uploadButton = () => {
            if (this.uploadImageButton !== null && this.loadCat !== undefined) {
                this.uploadImageButton.onclick = this.loadCat.uploadImage;
            }
        };
    }
}
export class HandleDom {
    constructor(spanError, elementImages, containerFavoriteImages, form, thumbnail, loadCat) {
        this.spanError = spanError;
        this.elementImages = elementImages;
        this.containerFavoriteImages = containerFavoriteImages;
        this.form = form;
        this.thumbnail = thumbnail;
        this.loadCat = loadCat;
        this.run = (loadCat) => {
            this.loadCat = loadCat;
        };
        this.addFavoriteElementView = (newElement) => {
            var _a;
            (_a = this.containerFavoriteImages) === null || _a === void 0 ? void 0 : _a.append(newElement);
        };
        this.catchError = (error) => {
            if (this.spanError !== null) {
                this.spanError.innerText = `Something went wrong. ${error}`;
            }
        };
        this.createElementFavoriteImage = (favoriteCat) => {
            const div = document.createElement("div");
            const imageElement = document.createElement("img");
            const button = document.createElement("button");
            const image = imageElement;
            const id = favoriteCat.id;
            button.textContent = "Get out cat picture from favorites";
            image.src = favoriteCat.image.url;
            image.width = 200;
            image.height = 200;
            div.className = "favoriteDiv";
            div.append(image, button);
            return {
                div,
                button,
                id,
            };
        };
        this.createRandomImage = (cat, index) => {
            const image = this.elementImages[index];
            image.src = cat.url;
            image.width = 200;
            image.height = 200;
        };
        this.createThumbnail = () => {
            var _a, _b;
            const imageThumbnail = this.thumbnail;
            if (typeof ((_a = this.loadCat) === null || _a === void 0 ? void 0 : _a.reader.result) === "string") {
                imageThumbnail.src = (_b = this.loadCat) === null || _b === void 0 ? void 0 : _b.reader.result;
                imageThumbnail.width = 200;
                imageThumbnail.height = 200;
            }
        };
        this.favoriteImages = (favoriteCats) => {
            var _a;
            if (this.containerFavoriteImages !== null) {
                this.containerFavoriteImages.innerText = "";
            }
            const elements = [];
            favoriteCats.forEach(cat => {
                var _a, _b;
                const { div, button, id } = this.createElementFavoriteImage(cat);
                (_a = this.loadCat) === null || _a === void 0 ? void 0 : _a.domHandlers[0].deleteFavoriteBack(button, id);
                (_b = this.loadCat) === null || _b === void 0 ? void 0 : _b.domHandlers[0].deleteFavoriteFront(div);
                elements.push(div);
            });
            (_a = this.containerFavoriteImages) === null || _a === void 0 ? void 0 : _a.append(...elements);
        };
    }
}
