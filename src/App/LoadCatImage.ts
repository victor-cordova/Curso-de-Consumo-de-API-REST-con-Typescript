import { Cat } from "./models/cat.model";
import { FavoriteCat } from "./models/favorite.model";
import { RandomData } from "./models/random-data.model"

import { CatService } from "./services/cat.service";
import { HandleEvents } from "./view/handleEvents";
import { HandleDom } from "./view/handleDom";
import { LocalStorage } from "./localStorage";


export class LoadCatImage {
  constructor (
    private readonly catService: CatService,
    public readonly domHandlers: [HandleEvents, HandleDom],
    public readonly lStorage: LocalStorage,
    public readonly reader: FileReader,
    public formData?: FormData,
    private randomIds?: string[],
    private randomUrlImages?: string[],
  ) {}

  private _initDom = (): void => {
    this.domHandlers.forEach(handler => {
      handler.run(this);
    })
  }

  run = async (): Promise<void> => {
    this._initDom();
    this.showFavorites();
    await this.checkLocalStorage();
    await this.showRandom();
  }

  checkLocalStorage = async () => {
    const localStorageData: RandomData | undefined = this.lStorage.getData();

    if (localStorageData) {
      this.randomIds = localStorageData.catIds;
      this.randomUrlImages = localStorageData.urlImages;
    } else {
      await this.getRandomDataApi();
    }
  }

  deleteFavorite = async (catId: number): Promise<void> => {
    try {
      await this.catService.delete(catId);

    } catch (error) {
      const stringError = error as string;

      this.domHandlers[1].catchError(stringError);
    }
  }

  saveOnFavorites = async (catId: string): Promise<void> => {
    try {
      const data = await this.catService.postFavorite(catId);

      this.addFavorite(data.id);
    } catch (error) {
      const stringError = error as string;

      this.domHandlers[1].catchError(stringError);
    }
  }

  getRandomDataApi = async () => {
    try {

      const isFavoritePath = false;
      const cats: Cat[] = await this.catService.getAll(isFavoritePath);
      const catIds: string[] = cats.map(cat => cat.id);
      const urlImages: string[] = cats.map(cat => cat.url);

      this.randomIds = catIds;
      this.randomUrlImages = urlImages;
    } catch (error) {
      const stringError = error as string;

      this.domHandlers[1].catchError(stringError);
    }
  }

  showRandom = async (): Promise<void> => {
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
        });
      }
    } catch (error) {
      const stringError = error as string;

      this.domHandlers[1].catchError(stringError);
    }
  }

  uploadImage = async () => {
    try {
      const form: FormData | undefined= this.formData;

      if (form) {
        await this.catService.postImage(form);
      }
    } catch (error) {
      const stringError = error as string;

      this.domHandlers[1].catchError(stringError);
    }
  }

  private addFavorite = async (catId: number): Promise<void> => {
    try {
      const cat: FavoriteCat = await this.catService.getOne(catId);
      const {div, button, id} = this.domHandlers[1].createElementFavoriteImage(cat);

      this.domHandlers[0].deleteFavoriteBack(button, id);
      this.domHandlers[0].deleteFavoriteFront(div);
      this.domHandlers[1].addFavoriteElementView(div);
    } catch (error) {
      const stringError = error as string;

      this.domHandlers[1].catchError(stringError);
    }
  }

  private showFavorites = async (): Promise<void> => {
    try {
      let localStorageDataFavorite: FavoriteCat[] | undefined = this.getLocalStorageFavorite();

      if (!localStorageDataFavorite) {
        const isFavoritePath = true;

        localStorageDataFavorite = await this.catService.getAll(isFavoritePath);
        this.setLocalStorageFavorite(localStorageDataFavorite);
      }
      this.domHandlers[1].favoriteImages(localStorageDataFavorite);

    } catch (error) {
      const stringError = error as string;

      this.domHandlers[1].catchError(stringError);
    }
  }

  setLocalStorageFavorite = (data: FavoriteCat[]) => {
    const dataStringified: string = JSON.stringify(data)

    localStorage.setItem("favorite-images", dataStringified);
  }

  getLocalStorageFavorite = () => {
    const localStorageFavorite: string | null = localStorage.getItem("favorite-images");
    let localStorageFavoriteParsed: FavoriteCat[] | undefined;

    if (!localStorageFavorite) {
      localStorage.setItem("favorite-images", JSON.stringify([]));
      localStorageFavoriteParsed = undefined;
    }
    else {
      localStorageFavoriteParsed = JSON.parse(localStorageFavorite);
    }
    return localStorageFavoriteParsed;
  }
}
