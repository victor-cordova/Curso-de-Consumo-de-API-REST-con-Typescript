import { Cat } from "./../../models/cat.model";

(async () => {
  console.log("Hello world.");
  const URL: string = "https://api.thecatapi.com/v1/images/search?limit=5";
  const res: Response = await fetch(URL);
  const data: Cat[] = await res.json();
  document.querySelectorAll("img")
  const imgGotById: HTMLElement | null = document.getElementById("picture");
  // const imgGotByQuery: HTMLImageElement | null = document.querySelector("img");
  // const dataString: string = data[0].url;
  console.log(data);

  // if (imgGotById !== null) {
  //   const img: HTMLImageElement = imgGotById as HTMLImageElement; //para usar los

  //   img.src = dataString;
  // }
})();

//Reto
const URL: string = "https://api.thecatapi.com/v1/images/search";
const imgGotById: HTMLElement | null = document.getElementById("picture");
const button: HTMLElement | null = document.getElementById("boton");

async function updateImage (): Promise<void> {
  const res: Response = await fetch(URL);
  const data: Cat[] = await res.json();
  const dataString: string = data[0].url;

  if (imgGotById !== null) {
    const img: HTMLImageElement = imgGotById as HTMLImageElement;

    img.src = dataString;
  }
};
updateImage();
if (button!== null) {
  button.onclick = updateImage;
}
