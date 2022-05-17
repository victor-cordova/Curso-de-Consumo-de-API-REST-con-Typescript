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
    private readonly lsNames: [string, string],
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
    await this.checkAndSetDataByLS();
    await this.showRandom();
    // await
  }

  checkAndSetDataByLS = async () => {
    const localStorageData: RandomData | undefined = this.lStorage.getData(this.lsNames[1]);

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
        }, this.lsNames[1]);
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
      const {picture, button, id} = this.domHandlers[1].createElementFavoriteImage(cat);

      this.domHandlers[0].deleteFavoriteBack(button, id);
      this.domHandlers[0].deleteFavoriteFront(picture);
      this.domHandlers[1].addFavoriteElementView(picture);
    } catch (error) {
      const stringError = error as string;

      this.domHandlers[1].catchError(stringError);
    }
  }

  private showFavorites = async (): Promise<void> => {
    try {
      // let localStorageDataFavorite: FavoriteCat[] | undefined = this.lStorage.getData(this.lsNames[0]);

      // if (localStorageDataFavorite) {
        const isFavoritePath = true;

        let localStorageDataFavorite: FavoriteCat[] = await this.catService.getAll(isFavoritePath);
        // this.lStorage.updateData(localStorageDataFavorite, this.lsNames[0]);
      // }
      this.domHandlers[1].favoriteImages(localStorageDataFavorite);

    } catch (error) {
      const stringError = error as string;

      this.domHandlers[1].catchError(stringError);
    }
  }
}
