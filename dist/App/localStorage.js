// import { FavoriteCat } from "./models/favorite.model";
// import { RandomData } from "./models/random-data.model"
export class LocalStorage {
    constructor() {
        this.getData = (lsName) => {
            const localStorageRandom = localStorage.getItem(lsName);
            let localStorageRandomParsed;
            if (!localStorageRandom) {
                localStorage.setItem(lsName, JSON.stringify([]));
                localStorageRandomParsed = undefined;
            }
            else {
                localStorageRandomParsed = JSON.parse(localStorageRandom);
            }
            return localStorageRandomParsed;
        };
        this.updateData = async (data, lsName) => {
            const dataStringified = JSON.stringify(data);
            localStorage.setItem(lsName, dataStringified);
        };
    }
}
