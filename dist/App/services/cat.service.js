export class CatService {
    constructor(apiKey, favoritePath, randomPath, uploadPath) {
        this.apiKey = apiKey;
        this.favoritePath = favoritePath;
        this.randomPath = randomPath;
        this.uploadPath = uploadPath;
        this.delete = async (catId) => {
            const stringId = catId.toString();
            const requestPath = `${this.favoritePath}/${catId}`;
            const res = await fetch(requestPath, {
                method: "DELETE",
                headers: {
                    "X-API-KEY": this.apiKey,
                }
            });
            if (res.status === 200) {
                const data = await res.json();
                return data;
            }
            const data = await res.json();
            throw Error(`Error ${data.status}. ${data.message}`);
        };
        this.getAll = async (isFavoritePath) => {
            const requestPath = isFavoritePath ? this.favoritePath : this.randomPath;
            const res = await fetch(requestPath, {
                headers: {
                    "X-API-KEY": this.apiKey, //Ahora se coloca el api key como header, en vez de
                    //query parameter.
                }
            });
            if (res.status === 200) {
                const data = await res.json();
                return data;
            }
            const data = await res.json();
            throw Error(`Error ${data.status}. ${data.message}`);
        };
        this.getOne = async (catId) => {
            const requestPath = `${this.favoritePath}/${catId}`;
            const res = await fetch(requestPath, {
                headers: {
                    "X-API-KEY": this.apiKey,
                }
            });
            if (res.status === 200) {
                const data = await res.json();
                return data;
            }
            const data = await res.json();
            throw Error(`Error ${data.status}. ${data.message}`);
        };
        this.postImage = async (formData) => {
            const res = await fetch(this.uploadPath, {
                method: "POST",
                headers: {
                    "X-API-KEY": this.apiKey,
                },
                body: formData,
            });
            if (res.status === 201) {
                const data = await res.json();
                return data;
            }
            const data = await res.json();
            throw Error(`Error ${data.status}. ${data.message}`);
        };
        this.postFavorite = async (catId) => {
            const res = await fetch(this.favoritePath, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    //recibirá un formato tipo json, porque es lcomo acepta la api.
                    "X-API-KEY": this.apiKey,
                },
                body: JSON.stringify({
                    image_id: catId
                })
            });
            if (res.status === 200) {
                const data = await res.json();
                return data;
            }
            const data = await res.json();
            throw Error(`Error ${data.status}. ${data.message}`);
        };
    }
}
