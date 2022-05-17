import { FavoriteCat } from "../models/favorite.model";
import { LoadCatImage } from "./../loadCatImage";
import { FavoriteElement } from "../models/favorite-element.model";

export class HandleDom {
  constructor(
    private readonly spanError: HTMLElement | null,
    private readonly elementImages: HTMLCollectionOf<Element>,
    private readonly containerFavoriteImages: HTMLElement | null,
    public readonly form: HTMLElement | null,
    private readonly thumbnail: HTMLElement | null,
    private readonly thumbnailText: HTMLElement | null,
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
    const picture: HTMLElement = document.createElement("picture");
    const imageElement: HTMLElement = document.createElement("img");
    const button: HTMLElement = document.createElement("button");
    const image: HTMLImageElement = imageElement as HTMLImageElement;
    const id: number = favoriteCat.id;

    // button.textContent = "Get out cat picture from favorites";
    // button.style.backgroundImage = "https://img.icons8.com/ios-glyphs/30/000000/cancel.png";

    // image.style.backgroundImage = `url(${favoriteCat.image.url})`;
    image.src = favoriteCat.image.url;

    button.className = "picture__favorite-button";
    picture.className = "picture";
    image.className = "picture__img";

    picture.append(image, button);
    return {
      picture,
      button,
      id,
    };
  }

  createRandomImage = (urlImage: string, index: number) => {
    const image = this.elementImages[index] as HTMLImageElement;
    // image.style.backgroundImage = `url(${urlImage})`;
    // console.log(urlImage);
    // class="catImage"
    // image.style.backgroundImage = `url(${urlImage})`;
    image.src = urlImage;
    // image.width = 200;
    // image.height = 200;
  }

  createThumbnail = () => {
    const imageThumbnail = this.thumbnail as HTMLImageElement;


    if (typeof(this.loadCat?.reader.result) === "string" && this.thumbnailText) {
      // imageThumbnail.style.backgroundImage = `url(${this.loadCat?.reader.result})`;
      imageThumbnail.src = this.loadCat?.reader.result;
      imageThumbnail.classList.add("thumbnail__img--loaded");
      // imageThumbnail.className =
      this.thumbnailText.classList.add("thumbnail__text--hidden");
      // imageThumbnail.className = ""
      // imageThumbnail.width = 200;
      // imageThumbnail.height = 200;
    }
  }

  favoriteImages = (favoriteCats: FavoriteCat[]): void => {
    if(this.containerFavoriteImages !== null){
      this.containerFavoriteImages.innerText = "";
    }
    const elements: HTMLElement[] = [];

    favoriteCats.forEach(cat => {
      const {picture, button, id} = this.createElementFavoriteImage(cat);

      this.loadCat?.domHandlers[0].deleteFavoriteBack(button, id);
      this.loadCat?.domHandlers[0].deleteFavoriteFront(picture);
      elements.push(picture);
    });
    this.containerFavoriteImages?.append(...elements);
  }
}
