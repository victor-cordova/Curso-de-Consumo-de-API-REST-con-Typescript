import { Image } from "./image.model";

export interface FavoriteCat {
  created_at: Date;
  id:         number;
  image:      Image;
  image_id:   string;
  sub_id:     string;
  user_id:    string;
}
