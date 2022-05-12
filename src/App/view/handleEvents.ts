import { LoadCatImage } from "./../loadCatImage";

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

  deleteFavoriteBack = (button: HTMLElement, catId: number): void => {
    button.addEventListener("click", () => this.loadCat?.deleteFavorite(catId));
  }

  deleteFavoriteFront = (element: Element): void => {
    const button = element.querySelector("button");

    button?.addEventListener("click", () => {
      element.remove();
    })
  }

  saveButtons = (catIds: string[]): void => {
    catIds.forEach((catId, index) => {
      const saveButton = this.saveFavoritebuttons[index] as HTMLElement;
      saveButton.onclick = () => this.loadCat?.saveOnFavorites(catId);
    })
  }


  private fillThumbnail = () => {
    const file: FormDataEntryValue | null | undefined= this.formData?.get("file");
    const newFile = file as File;

    this.loadCat?.reader.readAsDataURL(newFile)
    this.loadCat?.reader.addEventListener("load", () => {
      this.loadCat?.domHandlers[1].createThumbnail();
    });
  }

  private getFormData = () => {
    const input = this.inputElement as HTMLInputElement;
    input.addEventListener("input", () => {
      const newForm = this.loadCat?.domHandlers[1].form as HTMLFormElement;

      this.formData = new FormData(newForm);
      this.fillThumbnail();
    });
  }

  private updateRandomButton = () => {
    if (this.updateImagesButton!== null && this.loadCat!== undefined) {
      this.updateImagesButton.onclick = this.loadCat.showRandom;
    }
  }

  private uploadButton = () => {
    if (this.uploadImageButton !== null && this.loadCat !== undefined) {
      this.uploadImageButton.onclick = this.loadCat.uploadImage;
    }
  }
}
