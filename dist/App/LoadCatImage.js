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
        this.run = async () => {
            this._initDom();
            this.showFavorites();
            await this.checkAndSetDataByLS();
            await this.showRandom();
            // await
        };
        this.checkAndSetDataByLS = async () => {
            const localStorageData = this.lStorage.getData(this.lsNames[1]);
            if (localStorageData) {
                this.randomIds = localStorageData.catIds;
                this.randomUrlImages = localStorageData.urlImages;
            }
            else {
                await this.getRandomDataApi();
            }
        };
        this.deleteFavorite = async (catId) => {
            try {
                await this.catService.delete(catId);
            }
            catch (error) {
                const stringError = error;
                this.domHandlers[1].catchError(stringError);
            }
        };
        this.saveOnFavorites = async (catId) => {
            try {
                const data = await this.catService.postFavorite(catId);
                this.addFavorite(data.id);
            }
            catch (error) {
                const stringError = error;
                this.domHandlers[1].catchError(stringError);
            }
        };
        this.getRandomDataApi = async () => {
            try {
                const isFavoritePath = false;
                const cats = await this.catService.getAll(isFavoritePath);
                const catIds = cats.map(cat => cat.id);
                const urlImages = cats.map(cat => cat.url);
                this.randomIds = catIds;
                this.randomUrlImages = urlImages;
            }
            catch (error) {
                const stringError = error;
                this.domHandlers[1].catchError(stringError);
            }
        };
        this.showRandom = async () => {
            try {
                if (this.randomIds && this.randomUrlImages) {
                    this.domHandlers[0].saveButtons(this.randomIds);
                    this.randomUrlImages.forEach((url, index) => {
                        this.domHandlers[1].createRandomImage(url, index);
                    });
                }
                await this.getRandomDataApi();
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
        };
        this.uploadImage = async () => {
            try {
                const form = this.formData;
                if (form) {
                    await this.catService.postImage(form);
                }
            }
            catch (error) {
                const stringError = error;
                this.domHandlers[1].catchError(stringError);
            }
        };
        this.addFavorite = async (catId) => {
            try {
                const cat = await this.catService.getOne(catId);
                const { picture, button, id } = this.domHandlers[1].createElementFavoriteImage(cat);
                this.domHandlers[0].deleteFavoriteBack(button, id);
                this.domHandlers[0].deleteFavoriteFront(picture);
                this.domHandlers[1].addFavoriteElementView(picture);
            }
            catch (error) {
                const stringError = error;
                this.domHandlers[1].catchError(stringError);
            }
        };
        this.showFavorites = async () => {
            try {
                // let localStorageDataFavorite: FavoriteCat[] | undefined = this.lStorage.getData(this.lsNames[0]);
                // if (localStorageDataFavorite) {
                const isFavoritePath = true;
                let localStorageDataFavorite = await this.catService.getAll(isFavoritePath);
                // this.lStorage.updateData(localStorageDataFavorite, this.lsNames[0]);
                // }
                this.domHandlers[1].favoriteImages(localStorageDataFavorite);
            }
            catch (error) {
                const stringError = error;
                this.domHandlers[1].catchError(stringError);
            }
        };
    }
}
