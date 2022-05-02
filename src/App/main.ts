import { Cat } from "./../models/cat.model";

const API_URL_RANDOM: string = "https://api.thecatapi.com/v1/images/search?limit=5&api_key=707899fb-0e66-4594-a01a-e6f5879e0d8b";
const API_URL_FAVORITES: string = "https://api.thecatapi.com/v1/favourites?api_key=707899fb-0e66-4594-a01a-e6f5879e0d8b";
const images: HTMLCollectionOf<Element> = document.getElementsByClassName("catImage");
const button: HTMLElement | null = document.getElementById("boton");
const spanError: HTMLElement | null = document.getElementById("errorMessage");

class LoadCatImage {
  constructor (
    private readonly apiUrlRandom: string,
    private readonly apiUrlFavorites: string,
    private readonly images: HTMLCollectionOf<Element>,
    private readonly spanError: HTMLElement | null,
  ) {}

  favoriteImages () {
    this.loadImages(this.apiUrlFavorites);
  }

  randomImages () {
    this.loadImages(this.apiUrlRandom);
  }

  private async loadImages (apiUrl: string): Promise<void> {
    let res: Response | null = null;
    try {
      res = await fetch(apiUrl);
      if (res.status === 200) {
        const data: Cat[] = await res.json();

        for (let index = 0; index < this.images.length; index++) {
          const image = this.images[index] as HTMLImageElement;
          image.src = data[index].url;
        }
      }
    } catch (error) {
      if (this.spanError !== null && res!== null) {
        this.spanError.innerText = `Something went wrong. Error ${res.status}`
      }
      console.error(error);
    }
  }

}

const loadCatImage = new LoadCatImage(API_URL_RANDOM, API_URL_FAVORITES, images, spanError);

loadCatImage.randomImages();

if (button!== null) {
  button.onclick = loadCatImage.randomImages;
}

// loadRandomImages();
// loadFavoriteImages();

// async function loadFavoriteImages (): Promise<void> {
//   let res: Response | null = null;
//   try {
//     res = await fetch(API_URL_FAVORITES);
//     if (res.status === 200) {
//       const data: Cat[] = await res.json();

//       console.log(data);
//     }
//   } catch (error) {
//     if (spanError !== null && res!== null) {
//       spanError.innerText = `Something went wrong. Error ${res.status}`
//     }
//     console.error(error);
//   }
// };


// async function loadRandomImages (): Promise<void> {
//   let res: Response | null = null;
//   try {
//     res = await fetch(API_URL_RANDOM);
//     if (res.status === 200) {
//       const data: Cat[] = await res.json();

//       for (let index = 0; index < images.length; index++) {
//         const image = images[index] as HTMLImageElement;
//         image.src = data[index].url;
//       }
//     }
//   } catch (error) {
//     if (spanError !== null && res!== null) {
//       spanError.innerText = `Something went wrong. Error ${res.status}`
//     }
//     console.error(error);
//   }
// };

