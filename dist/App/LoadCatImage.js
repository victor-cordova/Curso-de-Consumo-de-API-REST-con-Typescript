var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class LoadCatImage {
    constructor(catService, domHandlers, lStorage, lsNames, reader, formData, randomIds, randomUrlImages) {
        this.catService = catService;
        this.domHandlers = domHandlers;
        this.lStorage = lStorage;
        this.lsNames = lsNames;
        this.reader = reader;
        this.formData = formData;
        this.randomIds = randomIds;
        this.randomUrlImages = randomUrlImages;
        this._initDom = () => {
            this.domHandlers.forEach(handler => {
                handler.run(this);
            });
        };
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            this._initDom();
            this.showFavorites();
            yield this.checkAndSetDataByLS();
            yield this.showRandom();
            // await
        });
        this.checkAndSetDataByLS = () => __awaiter(this, void 0, void 0, function* () {
            const localStorageData = this.lStorage.getData(this.lsNames[1]);
            if (localStorageData) {
                this.randomIds = localStorageData.catIds;
                this.randomUrlImages = localStorageData.urlImages;
            }
            else {
                yield this.getRandomDataApi();
            }
        });
        this.deleteFavorite = (catId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.catService.delete(catId);
            }
            catch (error) {
                const stringError = error;
                this.domHandlers[1].catchError(stringError);
            }
        });
        this.saveOnFavorites = (catId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.catService.postFavorite(catId);
                this.addFavorite(data.id);
            }
            catch (error) {
                const stringError = error;
                this.domHandlers[1].catchError(stringError);
            }
        });
        this.getRandomDataApi = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const isFavoritePath = false;
                const cats = yield this.catService.getAll(isFavoritePath);
                const catIds = cats.map(cat => cat.id);
                const urlImages = cats.map(cat => cat.url);
                this.randomIds = catIds;
                this.randomUrlImages = urlImages;
            }
            catch (error) {
                const stringError = error;
                this.domHandlers[1].catchError(stringError);
            }
        });
        this.showRandom = () => __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.randomIds && this.randomUrlImages) {
                    this.domHandlers[0].saveButtons(this.randomIds);
                    this.randomUrlImages.forEach((url, index) => {
                        this.domHandlers[1].createRandomImage(url, index);
                    });
                }
                yield this.getRandomDataApi();
                if (this.randomIds && this.randomUrlImages) {
                    this.lStorage.updateData({
                        catIds: this.randomIds,
                        urlImages: this.randomUrlImages,
                    }, this.lsNames[1]);
                }
            }
            catch (error) {
                const stringError = error;
                this.domHandlers[1].catchError(stringError);
            }
        });
        this.uploadImage = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const form = this.formData;
                if (form) {
                    yield this.catService.postImage(form);
                }
            }
            catch (error) {
                const stringError = error;
                this.domHandlers[1].catchError(stringError);
            }
        });
        this.addFavorite = (catId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cat = yield this.catService.getOne(catId);
                const { picture, button, id } = this.domHandlers[1].createElementFavoriteImage(cat);
                this.domHandlers[0].deleteFavoriteBack(button, id);
                this.domHandlers[0].deleteFavoriteFront(picture);
                this.domHandlers[1].addFavoriteElementView(picture);
            }
            catch (error) {
                const stringError = error;
                this.domHandlers[1].catchError(stringError);
            }
        });
        this.showFavorites = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // let localStorageDataFavorite: FavoriteCat[] | undefined = this.lStorage.getData(this.lsNames[0]);
                // if (localStorageDataFavorite) {
                const isFavoritePath = true;
                let localStorageDataFavorite = yield this.catService.getAll(isFavoritePath);
                // this.lStorage.updateData(localStorageDataFavorite, this.lsNames[0]);
                // }
                this.domHandlers[1].favoriteImages(localStorageDataFavorite);
            }
            catch (error) {
                const stringError = error;
                this.domHandlers[1].catchError(stringError);
            }
        });
    }
}
