const url =
'https://images.pexels.com/photos/974470/nature-stars-milky-way-galaxy-974470.jpeg?q=100';
const img: HTMLElement | null = document.getElementById('huge-image');
const loadButton: HTMLElement | null = document.getElementById('load-image');
const stopButton: HTMLElement | null = document.getElementById('stop-image');

let controller: AbortController | undefined;

loadButton?.addEventListener("click", async () => {
  //Se crea una función asíncrona para el botón
//de carga
  // startLoading(); //Se modifica el html

  controller = new AbortController(); //Se obtiene una instancia del objeto constructor


  try {
    const response: Response = await fetch(url, {signal: controller.signal}); //Se hace la
//solicitud y se le da el control para que luego pueda ser detenido el proceso.
    const blobResponse = await response.blob(); //El formato blob es usado
//para archivos pesados como imagenes o videos. Por medio de transformarlo a blob se evita
//que el video no sea convertido en un formato alejado a como esté(puede binario o un
//array buffer). Será un proceso menos tardado porque la transformación no será tan dificil
    const imgUrl = URL.createObjectURL(blobResponse); //La respuesta obtenida en formato
//blob es converida en tipo url.
// blobResponse.
    const image = img as HTMLImageElement;
    image.src = imgUrl; //Recién que se obtuvo la imagen del servidor se procede
//a colocarse en la página web.
  } catch (error) {
    console.error(error);
  }
})

stopButton?.addEventListener("click", () => controller?.abort())
