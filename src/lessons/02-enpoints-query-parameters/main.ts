import { Cat } from "./../../models/cat.model";

const URL: string = "https://api.thecatapi.com/v1/images/search?limit=5&api_key=707899fb-0e66-4594-a01a-e6f5879e0d8b";
const images: HTMLCollectionOf<Element> = document.getElementsByClassName("catImage");
const button: HTMLElement | null = document.getElementById("boton");



async function updateImages (): Promise<void> {
  const res: Response = await fetch(URL);
  const data: Cat[] = await res.json();

  for (let index = 0; index < images.length; index++) {
    const image = images[index] as HTMLImageElement;
    image.src = data[index].url;
  }
};

updateImages();

if (button!== null) {
  button.onclick = updateImages;
}
