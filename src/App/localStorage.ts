// import { FavoriteCat } from "./models/favorite.model";
// import { RandomData } from "./models/random-data.model"

export class LocalStorage {

  getData = (lsName: string) => {
    const localStorageRandom: string | null = localStorage.getItem(lsName);
    let localStorageRandomParsed;

    if (!localStorageRandom) {
      localStorage.setItem(lsName, JSON.stringify([]));
      localStorageRandomParsed = undefined;
    }
    else {
      localStorageRandomParsed = JSON.parse(localStorageRandom);
    }
    return localStorageRandomParsed;
  }

  updateData = async (data: any, lsName: string) => {
    const dataStringified: string = JSON.stringify(data)

    localStorage.setItem(lsName, dataStringified);
  }
}
