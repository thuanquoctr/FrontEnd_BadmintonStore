import Category from "./Category.model";

type Product = {
  id?: number;
  title?: string;
  pictureMain?: string;
  brand?: string;
  description?: string;
  price?: number;
  quantity?: number;
  view?: number;
  quantitySold?: number;
  category?: Category;
};
export default Product;
