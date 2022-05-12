import { LoadCatImage } from "./LoadCatImage";
import { CatService } from "./services/cat.service";
import { HandleEvents, HandleDom } from "./view/main";

const API_URL_FAVORITES: string = "https://api.thecatapi.com/v1/favourites";
const API_URL_RANDOM: string = "https://api.thecatapi.com/v1/images/search?limit=2&api_key=707899fb-0e66-4594-a01a-e6f5879e0d8b";
const API_URL_UPLOAD: string = "https://api.thecatapi.com/v1/images/upload";
const API_KEY: string = "707899fb-0e66-4594-a01a-e6f5879e0d8b";

const images: HTMLCollectionOf<Element> = document.getElementsByClassName("catImage");
const thumbnailImage: HTMLElement | null = document.getElementById("thumbnailImage");
const updateImagesButton: HTMLElement | null = document.getElementById("updateImagesButton");
const saveOnFavoritesButtons: HTMLCollectionOf<Element> = document.getElementsByClassName("saveButton");
const containerFavoriteImages: HTMLElement | null = document.getElementById("containerImages");
const spanError: HTMLElement | null = document.getElementById("errorMessage");
const form: HTMLElement | null = document.getElementById("uploadForm");
const input: HTMLElement | null = document.getElementById("file");
const uploadButton = document.getElementById("uploadButton");

const reader = new FileReader();

const handleEvents = new HandleEvents(saveOnFavoritesButtons, updateImagesButton, uploadButton, input);
const handleDom = new HandleDom(spanError, images, containerFavoriteImages, form, thumbnailImage);

const catService = new CatService(API_KEY, API_URL_FAVORITES, API_URL_RANDOM, API_URL_UPLOAD);
const loadCatImage = new LoadCatImage(catService, [handleEvents, handleDom], reader);

loadCatImage.run();

export { loadCatImage };
