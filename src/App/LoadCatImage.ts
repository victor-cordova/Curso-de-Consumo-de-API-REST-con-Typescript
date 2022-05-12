import { Cat } from "./models/cat.model";
import { FavoriteCat } from "./models/favorite.model";
import { CatService } from "./services/cat.service";
import { HandleEvents } from "./view/handleEvents";
import { HandleDom } from "./view/handleDom";

export class LoadCatImage {
  constructor (
    private readonly catService: CatService,
    public readonly domHandlers: [HandleEvents, HandleDom],
    public readonly reader: FileReader,
  ) {}

  private _initDom = (): void => {
    this.domHandlers.forEach(handler => {
      handler.run(this);
    })
  }

  run = (): void => {
    this._initDom();
    this.showRandom();
    this.showFavorites();
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

  showRandom = async (): Promise<void> => {
    try {
      const isFavoritePath = false;
      const cats: Cat[] = await this.catService.getAll(isFavoritePath);
      const catIds: string[] = cats.map(cat => cat.id);

      this.domHandlers[0].saveButtons(catIds);
      cats.forEach((cat, index) => {
        this.domHandlers[1].createRandomImage(cat, index);
      });
    } catch (error) {
      const stringError = error as string;

      this.domHandlers[1].catchError(stringError);
    }
  }

  uploadImage = async () => {
    try {
      const form: FormData | undefined= this.domHandlers[0].formData;

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
      const isFavoritePath = true;
      const data: FavoriteCat[] = await this.catService.getAll(isFavoritePath);

      this.domHandlers[1].favoriteImages(data);
    } catch (error) {
      const stringError = error as string;

      this.domHandlers[1].catchError(stringError);
    }
  }
}
