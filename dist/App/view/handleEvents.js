export class HandleEvents {
    constructor(saveFavoritebuttons, updateImagesButton, uploadImageButton, inputElement, loadCat) {
        this.saveFavoritebuttons = saveFavoritebuttons;
        this.updateImagesButton = updateImagesButton;
        this.uploadImageButton = uploadImageButton;
        this.inputElement = inputElement;
        this.loadCat = loadCat;
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
            var _a, _b, _c, _d;
            const file = (_b = (_a = this.loadCat) === null || _a === void 0 ? void 0 : _a.formData) === null || _b === void 0 ? void 0 : _b.get("file");
            const newFile = file;
            (_c = this.loadCat) === null || _c === void 0 ? void 0 : _c.reader.readAsDataURL(newFile);
            (_d = this.loadCat) === null || _d === void 0 ? void 0 : _d.reader.addEventListener("load", () => {
                var _a;
                (_a = this.loadCat) === null || _a === void 0 ? void 0 : _a.domHandlers[1].createThumbnail();
            });
        };
        this.getFormData = () => {
            const input = this.inputElement;
            input.addEventListener("input", () => {
                var _a;
                const newForm = (_a = this.loadCat) === null || _a === void 0 ? void 0 : _a.domHandlers[1].form;
                if (this.loadCat) {
                    this.loadCat.formData = new FormData(newForm);
                }
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
