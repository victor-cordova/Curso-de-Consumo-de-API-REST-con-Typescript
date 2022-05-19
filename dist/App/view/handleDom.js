export class HandleDom {
    constructor(spanError, elementImages, containerFavoriteImages, form, thumbnail, thumbnailText, loadCat) {
        this.spanError = spanError;
        this.elementImages = elementImages;
        this.containerFavoriteImages = containerFavoriteImages;
        this.form = form;
        this.thumbnail = thumbnail;
        this.thumbnailText = thumbnailText;
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
            const picture = document.createElement("picture");
            const imageElement = document.createElement("img");
            const button = document.createElement("button");
            const image = imageElement;
            const id = favoriteCat.id;
            // button.textContent = "Get out cat picture from favorites";
            // button.style.backgroundImage = "https://img.icons8.com/ios-glyphs/30/000000/cancel.png";
            // image.style.backgroundImage = `url(${favoriteCat.image.url})`;
            image.src = favoriteCat.image.url;
            button.className = "picture__favorite-button";
            picture.className = "picture";
            image.className = "picture__img picture__img--favorite";
            picture.append(image, button);
            return {
                picture,
                button,
                id,
            };
        };
        this.createRandomImage = (urlImage, index) => {
            const image = this.elementImages[index];
            // image.style.backgroundImage = `url(${urlImage})`;
            // console.log(urlImage);
            // class="catImage"
            // image.style.backgroundImage = `url(${urlImage})`;
            image.src = urlImage;
            // image.width = 200;
            // image.height = 200;
        };
        this.createThumbnail = () => {
            var _a, _b;
            const imageThumbnail = this.thumbnail;
            if (typeof ((_a = this.loadCat) === null || _a === void 0 ? void 0 : _a.reader.result) === "string" && this.thumbnailText) {
                // imageThumbnail.style.backgroundImage = `url(${this.loadCat?.reader.result})`;
                imageThumbnail.src = (_b = this.loadCat) === null || _b === void 0 ? void 0 : _b.reader.result;
                imageThumbnail.classList.add("thumbnail__img--loaded");
                // imageThumbnail.className =
                this.thumbnailText.classList.add("thumbnail__text--hidden");
                // imageThumbnail.className = ""
                // imageThumbnail.width = 200;
                // imageThumbnail.height = 200;
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
                const { picture, button, id } = this.createElementFavoriteImage(cat);
                (_a = this.loadCat) === null || _a === void 0 ? void 0 : _a.domHandlers[0].deleteFavoriteBack(button, id);
                (_b = this.loadCat) === null || _b === void 0 ? void 0 : _b.domHandlers[0].deleteFavoriteFront(picture);
                elements.push(picture);
            });
            (_a = this.containerFavoriteImages) === null || _a === void 0 ? void 0 : _a.append(...elements);
        };
    }
}
