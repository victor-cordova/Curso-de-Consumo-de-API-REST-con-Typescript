import { LoadCatImage } from "./LoadCatImage";

const API_URL_RANDOM: string = "https://api.thecatapi.com/v1/images/search?limit=2&api_key=707899fb-0e66-4594-a01a-e6f5879e0d8b";
// const API_URL_FAVORITES_WITH_KEY: string = "https://api.thecatapi.com/v1/favourites?api_key=707899fb-0e66-4594-a01a-e6f5879e0d8b";
const API_URL_FAVORITES: string = "https://api.thecatapi.com/v1/favourites";
const API_KEY: string = "api_key=707899fb-0e66-4594-a01a-e6f5879e0d8b";
const images: HTMLCollectionOf<Element> = document.getElementsByClassName("catImage");
const updateImagesButton: HTMLElement | null = document.getElementById("updateImagesButton");
const saveOnFavoritesButton1: HTMLElement | null = document.getElementById("save1");
const saveOnFavoritesButton2: HTMLElement | null = document.getElementById("save2");

const spanError: HTMLElement | null = document.getElementById("errorMessage");

const loadCatImage = new LoadCatImage(API_KEY, API_URL_RANDOM, API_URL_FAVORITES, images, spanError, saveOnFavoritesButton1, saveOnFavoritesButton2);

loadCatImage.randomImages();
loadCatImage.favoriteImages();

if (updateImagesButton!== null) {
  updateImagesButton.onclick = loadCatImage.randomImages;
}
