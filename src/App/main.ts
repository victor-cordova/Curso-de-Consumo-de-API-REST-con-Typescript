import { LoadCatImage } from "./LoadCatImage";
import { CatService } from "./services/cat.service";
import { HandleEvents, HandleDom } from "./view/main";

const API_URL_RANDOM: string = "https://api.thecatapi.com/v1/images/search?limit=2&api_key=707899fb-0e66-4594-a01a-e6f5879e0d8b";
const API_URL_FAVORITES: string = "https://api.thecatapi.com/v1/favourites";
const API_KEY: string = "api_key=707899fb-0e66-4594-a01a-e6f5879e0d8b";

const images: HTMLCollectionOf<Element> = document.getElementsByClassName("catImage");
const updateImagesButton: HTMLElement | null = document.getElementById("updateImagesButton");
const saveOnFavoritesButtons: HTMLCollectionOf<Element> = document.getElementsByClassName("saveButton");
const containerFavoriteImages: HTMLElement | null = document.getElementById("containerImages");
const spanError: HTMLElement | null = document.getElementById("errorMessage");

const handleEvents = new HandleEvents(saveOnFavoritesButtons, updateImagesButton);
const handleDom = new HandleDom(spanError, images, containerFavoriteImages);

const catService = new CatService(API_KEY, API_URL_FAVORITES, API_URL_RANDOM);
const loadCatImage = new LoadCatImage(catService, [handleEvents, handleDom]);

loadCatImage.run();

export { loadCatImage };
