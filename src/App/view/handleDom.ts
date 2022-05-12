import { FavoriteCat } from "../models/favorite.model";
import { LoadCatImage } from "./../loadCatImage";
import { FavoriteElement } from "../models/favorite-element.model";
import { Cat } from "../models/cat.model";

export class HandleDom {
  constructor(
    private readonly spanError: HTMLElement | null,
    private readonly elementImages: HTMLCollectionOf<Element>,
    private readonly containerFavoriteImages: HTMLElement | null,
    public readonly form: HTMLElement | null,
    private readonly thumbnail: HTMLElement | null,
    private loadCat?: LoadCatImage,
  ){}

  run = (loadCat: LoadCatImage) => {
    this.loadCat = loadCat;
  }

  addFavoriteElementView = (newElement: HTMLElement): void => {
    this.containerFavoriteImages?.append(newElement);
  }

  catchError = (error: string): void => {
    if (this.spanError !== null) {
      this.spanError.innerText = `Something went wrong. ${error}`;
    }
  }

  createElementFavoriteImage = (favoriteCat: FavoriteCat): FavoriteElement => {
    const div: HTMLElement = document.createElement("div");
    const imageElement: HTMLElement = document.createElement("img");
    const button: HTMLElement = document.createElement("button");
    const image: HTMLImageElement = imageElement as HTMLImageElement;
    const id: number = favoriteCat.id;

    button.textContent = "Get out cat picture from favorites";

    image.src = favoriteCat.image.url;
    image.width = 200;
    image.height = 200;

    div.className = "favoriteDiv";

    div.append(image, button);
    return {
      div,
      button,
      id,
    };
  }

  createRandomImage = (cat: Cat, index: number) => {
    const image: HTMLImageElement = this.elementImages[index] as HTMLImageElement;

    image.src = cat.url;
    image.width = 200;
    image.height = 200;
  }

  createThumbnail = () => {
    const imageThumbnail = this.thumbnail as HTMLImageElement;

    if (typeof(this.loadCat?.reader.result) === "string") {
      imageThumbnail.src = this.loadCat?.reader.result;
      imageThumbnail.width = 200;
      imageThumbnail.height = 200;
    }
  }

  favoriteImages = (favoriteCats: FavoriteCat[]): void => {
    if(this.containerFavoriteImages !== null){
      this.containerFavoriteImages.innerText = "";
    }
    const elements: HTMLElement[] = [];

    favoriteCats.forEach(cat => {
      const {div, button, id} = this.createElementFavoriteImage(cat);

      this.loadCat?.domHandlers[0].deleteFavoriteBack(button, id);
      this.loadCat?.domHandlers[0].deleteFavoriteFront(div);
      elements.push(div);
    });
    this.containerFavoriteImages?.append(...elements);
  }
}
