import { FavoriteCat } from "../models/favorite.model";
import { LoadCatImage } from "./../LoadCatImage";
import { FavoriteElement } from "../models/favorite-element.model";
import { Cat } from "../models/cat.model";

export class HandleEvents {

  constructor(
    private readonly saveFavoritebuttons: HTMLCollectionOf<Element>,
    private readonly updateImagesButton: HTMLElement | null,
    private readonly uploadImageButton: HTMLElement | null,
    private readonly inputElement: HTMLElement | null,
    private loadCat?: LoadCatImage,
    public formData?: FormData,
  ){}

  run = (loadCat: LoadCatImage) => {
    this.loadCat = loadCat;
    this.updateRandomButton();
    this.uploadButton();
    this.getFormData();
  }

  getFormData = () => {
    const input = this.inputElement as HTMLInputElement;
    input.addEventListener("input", () => {
      const newForm = this.loadCat?.domHandlers[1].form as HTMLFormElement;

      this.formData = new FormData(newForm);
      this.fillThumbnail();
    });
  }

  fillThumbnail = () => {
    const file: FormDataEntryValue | null | undefined= this.formData?.get("file");
    const newFile = file as File;

    this.loadCat?.reader.readAsDataURL(newFile)
    this.loadCat?.reader.addEventListener("load", () => {
      this.loadCat?.domHandlers[1].createThumbnail();
    });
  }

  private updateRandomButton = () => {
    if (this.updateImagesButton!== null && this.loadCat!== undefined) {
      this.updateImagesButton.onclick = this.loadCat.showRandom;
    }
  }

  saveButtons = (catIds: string[]): void => {
    catIds.forEach((catId, index) => {
      const saveButton = this.saveFavoritebuttons[index] as HTMLElement;
      saveButton.onclick = () => this.loadCat?.saveOnFavorites(catId);
    })
  }

  uploadButton = () => {
    if (this.uploadImageButton !== null && this.loadCat !== undefined) {
      this.uploadImageButton.onclick = this.loadCat.uploadImage;
    }
  }

  deleteFavoriteBack = (button: HTMLElement, catId: number): void => {
    button.addEventListener("click", () => this.loadCat?.deleteFavorite(catId));
  }

  deleteFavoriteFront = (element: Element): void => {
    const button = element.querySelector("button");

    button?.addEventListener("click", () => {
      element.remove();
    })
  }

}

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

  createThumbnail = () => {
    const imageThumbnail = this.thumbnail as HTMLImageElement;

    if (typeof(this.loadCat?.reader.result) === "string") {
      imageThumbnail.src = this.loadCat?.reader.result;
    }
  }

  createRandomImage = (cat: Cat, index: number) => {
    const image: HTMLImageElement = this.elementImages[index] as HTMLImageElement;

    image.src = cat.url;
  }

  createElementFavoriteImage = (favoriteCat: FavoriteCat): FavoriteElement => {
    const div: HTMLElement = document.createElement("div");
    const imageElement: HTMLElement = document.createElement("img");
    const button: HTMLElement = document.createElement("button");
    const image: HTMLImageElement = imageElement as HTMLImageElement;
    const id: number = favoriteCat.id;

    button.textContent = "Get out cat picture from favorites";

    image.src = favoriteCat.image.url;
    image.width = 150;

    div.className = "favoriteDiv";

    div.append(image, button);
    return {
      div,
      button,
      id,
    };
  }

  addFavoriteElementView = (newElement: HTMLElement): void => {
    this.containerFavoriteImages?.append(newElement);
  }

  uploadForm = () => {
    if (this.form !== null) {
      const newForm = this.form as HTMLFormElement;
      // const input = document.getElementById("file");
      // const inputNew = input as HTMLInputElement;

      // console.log(inputNew?.value);
      const formData = new FormData(newForm);

      return formData;
    }
  }

  catchError = (error: string): void => {
    if (this.spanError !== null) {
      this.spanError.innerText = `Something went wrong. ${error}`;
    }
  }
}
