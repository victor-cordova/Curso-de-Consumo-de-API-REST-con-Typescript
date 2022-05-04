import { Cat } from "./../models/cat.model";
import { RequestFailed } from "./../models/request.failed.model";
import { FavoriteCat } from "./../models/favorite.cat.model";

export class LoadCatImage {
  constructor (
    private readonly apiKey: string,
    private readonly apiUrlRandom: string,
    private readonly apiUrlFavorites: string,
    private readonly elementImages: HTMLCollectionOf<Element>,
    private readonly spanError: HTMLElement | null,
    private readonly saveFavorite1: HTMLElement | null,
    private readonly saveFavorite2: HTMLElement | null,
  ) {
    this.randomImages = this.randomImages.bind(this);
    this.saveOnFavorites = this.saveOnFavorites.bind(this);
    this.favoriteImages = this.favoriteImages.bind(this);
    this.deleteFavoriteImage = this.deleteFavoriteImage.bind(this);
  }

  private handleEventSaveButtons (favorites: Cat[]): void {
    if (this.saveFavorite1 !== null && this.saveFavorite2 !== null) {
      this.saveFavorite1.onclick = () => this.saveOnFavorites(favorites[0]);
      this.saveFavorite2.onclick = () => this.saveOnFavorites(favorites[1]);
    }
  }

  private handleEventDeleteFavoriteButtons (button: HTMLElement, data: FavoriteCat) {
      button.onclick = () => this.deleteFavoriteImage(data);
  }

  private favoriteImagesDom (data: FavoriteCat[]): void {
    const section: HTMLElement | null = document.getElementById("favoriteCats");
    const title: HTMLElement = document.createElement("h2");
    const titleText: Text = document.createTextNode("Favorite cats");

    if(section !== null){
      section.innerText = "";
    }

    title.appendChild(titleText);
    section?.appendChild(title);


    data.forEach(cat => {
      const article: HTMLElement = document.createElement("article");
      const imageElement: HTMLElement = document.createElement("img");
      const button: HTMLElement = document.createElement("button");
      const image: HTMLImageElement = imageElement as HTMLImageElement;
      const buttonText: Text = document.createTextNode("Get out cat picture from favorites");
      button.appendChild(buttonText); //Se le agrega un texto al botón


      article.appendChild(image);
      article.appendChild(button);

      section?.appendChild(article);

      console.log(article);

      image.src = cat.image.url;
      image.width = 150;

      this.handleEventDeleteFavoriteButtons(button, cat);
    });
  }

  async favoriteImages (): Promise<void> {
    const res: Response | null = await fetch(`${this.apiUrlFavorites}?${this.apiKey}`);

    if (res.status === 200) {
      const data: FavoriteCat[]= await res.json();
      this.favoriteImagesDom(data);

    } else {
      this.catchError(res);
    }
  }

  async randomImages ():Promise<void> {
    const res: Response | null = await fetch(this.apiUrlRandom);

    if (res.status === 200) {
      const cats: Cat[]= await res.json();
      this.handleEventSaveButtons(cats);
      cats.forEach((cat, index) => {
        const image = this.elementImages[index] as HTMLImageElement;

        image.src = cat.url;
      });
    } else {
      this.catchError(res);
    }
  }

  async saveOnFavorites (favorite: Cat): Promise<void> {
    let idImage: string = favorite.id;

    const res: Response | null = await fetch(`${this.apiUrlFavorites}?${this.apiKey}`, { //Cuando se quiere hacer una peticion
        //con fetch que no sea get se debe colocar las indicaciones de la peticion.
      method: "POST",
      headers: {
        "Content-Type": "application/json" //Lo indica la api.
      },
      body: JSON.stringify({
        image_id: idImage
      })
    });

    if (res.status === 200) {
      this.favoriteImages()
    } else {
      this.catchError(res);
    }
  }

  async deleteFavoriteImage (favorite: FavoriteCat) {
    let idImage: string = favorite.id.toString();
    const requestPath: string = `${this.apiUrlFavorites}/${idImage}?api_key=707899fb-0e66-4594-a01a-e6f5879e0d8b`;
    const res: Response | null = await fetch(requestPath, { //Cuando se quiere hacer una peticion
        //con fetch que no sea get se debe colocar las indicaciones de la peticion.
      method: "DELETE",
    });

    if (res.status === 200) {
      this.favoriteImages();
    } else {
      this.catchError(res);
    }
  }

  private async catchError(res: Response | null): Promise<void> {
    if (this.spanError !== null && res !== null) {
      const dataError: RequestFailed = await res.json();
      this.spanError.innerText = `Something went wrong. Error ${dataError.status}. ${dataError.message}`;
    }
  }
}
