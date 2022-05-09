import { RequestFailed } from "../models/request-failed.model";
import { FavoriteCat } from "../models/favorite.model";
import { RequestPostFavorite } from "../models/request-post.favorite";

export class CatService {

  constructor(
    private readonly apiKey: string,
    private readonly favoritePath: string,
    private readonly randomPath: string,
  ){}

  getAll = async (isFavoritePath: boolean): Promise<any[]> => {

    const requestPath: string = isFavoritePath? `${this.favoritePath}?${this.apiKey}` : this.randomPath;
    // const requestPath: string = path;
    const res: Response = await fetch(requestPath);

    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
    const data: RequestFailed = await res.json();

    throw Error(`Error ${data.status}. ${data.message}`);
  }

  getOne = async (catId: number): Promise<FavoriteCat> => {
    const requestPath: string = `${this.favoritePath}/${catId}?${this.apiKey}`;
    const res: Response = await fetch(requestPath);
    if (res.status === 200) {
      const data: FavoriteCat= await res.json();

      return data;
    }
    const data: RequestFailed = await res.json();
    throw Error(`Error ${data.status}. ${data.message}`);
  }

  post = async (catId: string): Promise<RequestPostFavorite> => {
    const requestPath: string = `${this.favoritePath}?${this.apiKey}`;
    const res: Response = await fetch(requestPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
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

  delete = async (catId: number): Promise<void>=> {
    const requestPath: string = `${this.favoritePath}/${catId}?${this.apiKey}`;
    const res: Response | null = await fetch(requestPath, {
      method: "DELETE",
    });

    if (res.status === 200) {
      const data = await res.json();

      return data;
    }
    const data: RequestFailed = await res.json();

    throw Error(`Error ${data.status}. ${data.message}`);
  }
}
