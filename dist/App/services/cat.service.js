var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CatService {
    constructor(apiKey, favoritePath, randomPath, uploadPath) {
        this.apiKey = apiKey;
        this.favoritePath = favoritePath;
        this.randomPath = randomPath;
        this.uploadPath = uploadPath;
        this.delete = (catId) => __awaiter(this, void 0, void 0, function* () {
            const stringId = catId.toString();
            const requestPath = `${this.favoritePath}/${catId}`;
            const res = yield fetch(requestPath, {
                method: "DELETE",
                headers: {
                    "X-API-KEY": this.apiKey,
                }
            });
            if (res.status === 200) {
                const data = yield res.json();
                return data;
            }
            const data = yield res.json();
            throw Error(`Error ${data.status}. ${data.message}`);
        });
        this.getAll = (isFavoritePath) => __awaiter(this, void 0, void 0, function* () {
            const requestPath = isFavoritePath ? this.favoritePath : this.randomPath;
            const res = yield fetch(requestPath, {
                headers: {
                    "X-API-KEY": this.apiKey, //Ahora se coloca el api key como header, en vez de
                    //query parameter.
                }
            });
            if (res.status === 200) {
                const data = yield res.json();
                return data;
            }
            const data = yield res.json();
            throw Error(`Error ${data.status}. ${data.message}`);
        });
        this.getOne = (catId) => __awaiter(this, void 0, void 0, function* () {
            const requestPath = `${this.favoritePath}/${catId}`;
            const res = yield fetch(requestPath, {
                headers: {
                    "X-API-KEY": this.apiKey,
                }
            });
            if (res.status === 200) {
                const data = yield res.json();
                return data;
            }
            const data = yield res.json();
            throw Error(`Error ${data.status}. ${data.message}`);
        });
        this.postImage = (formData) => __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(this.uploadPath, {
                method: "POST",
                headers: {
                    "X-API-KEY": this.apiKey,
                },
                body: formData,
            });
            if (res.status === 201) {
                const data = yield res.json();
                return data;
            }
            const data = yield res.json();
            throw Error(`Error ${data.status}. ${data.message}`);
        });
        this.postFavorite = (catId) => __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(this.favoritePath, {
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
                const data = yield res.json();
                return data;
            }
            const data = yield res.json();
            throw Error(`Error ${data.status}. ${data.message}`);
        });
    }
}
