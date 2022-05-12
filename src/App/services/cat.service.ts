import { FavoriteCat } from "../models/favorite.model";
import { RequestFailed } from "../models/request-failed.model";
import { RequestPostFavorite } from "../models/request-post.favorite";

export class CatService {

  constructor(
    private readonly apiKey: string,
    private readonly favoritePath: string,
    private readonly randomPath: string,
    private readonly uploadPath: string,
  ){}

  delete = async (catId: number): Promise<void>=> {
    const requestPath: string = `${this.favoritePath}/${catId}`;
    const res: Response | null = await fetch(requestPath, {
      method: "DELETE",
      headers: {
        "X-API-KEY": this.apiKey,
      }
    });

    if (res.status === 200) {
      const data = await res.json();

      return data;
    }
    const data: RequestFailed = await res.json();

    throw Error(`Error ${data.status}. ${data.message}`);
  }

  getAll = async (isFavoritePath: boolean): Promise<any[]> => {
    const requestPath: string = isFavoritePath? this.favoritePath : this.randomPath;

    const res: Response = await fetch(requestPath, {
      headers: {
        "X-API-KEY": this.apiKey, //Ahora se coloca el api key como header, en vez de
        //query parameter.
      }
    });

    if (res.status === 200) {
      const data = await res.json();

      return data;
    }
    const data: RequestFailed = await res.json();

    throw Error(`Error ${data.status}. ${data.message}`);
  }

  getOne = async (catId: number): Promise<FavoriteCat> => {
    const requestPath: string = `${this.favoritePath}/${catId}`;
    const res: Response = await fetch(requestPath, {
      headers: {
        "X-API-KEY": this.apiKey,
      }
    });
    if (res.status === 200) {
      const data: FavoriteCat= await res.json();

      return data;
    }
    const data: RequestFailed = await res.json();
    throw Error(`Error ${data.status}. ${data.message}`);
  }

  postImage = async (formData: FormData) => {
    const res = await fetch(this.uploadPath, {
      method: "POST",
      headers: {
        "X-API-KEY": this.apiKey,
      },
      body: formData,
    })

    if (res.status === 201) {
      const data = await res.json();

      return data;
    }
    const data: RequestFailed = await res.json();
    throw Error(`Error ${data.status}. ${data.message}`);
  }

  postFavorite = async (catId: string): Promise<RequestPostFavorite> => {
    const res: Response = await fetch(this.favoritePath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //Se coloca application/json para indicar que
        //recibirá un formato tipo json, porque es lcomo acepta la api.
        "X-API-KEY": this.apiKey,
      },
      body: JSON.stringify({ //Se pasa de objeto js a uno de tipo json.
        image_id: catId
      })
    });

    if (res.status === 200) {
      const data: RequestPostFavorite = await res.json();

      return data;
    }
    const data: RequestFailed = await res.json();
    throw Error(`Error ${data.status}. ${data.message}`);
  }
}
