import { RandomData } from "./models/random-data.model"

export class LocalStorage {

  getData = () => {
    const localStorageRandom: string | null = localStorage.getItem("random-images");
    let localStorageRandomParsed: RandomData | undefined;

    if (!localStorageRandom) {
      localStorage.setItem("random-images", JSON.stringify([]));
      localStorageRandomParsed = undefined;
    }
    else {
      localStorageRandomParsed = JSON.parse(localStorageRandom);
    }
    return localStorageRandomParsed;
  }

  updateData = async (data: RandomData) => {
    const dataStringified: string = JSON.stringify(data)

    localStorage.setItem("random-images", dataStringified);
  }
}
