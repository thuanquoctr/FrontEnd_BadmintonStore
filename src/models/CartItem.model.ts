import Product from "./Product.model";

type CartItemType = {
  id?: number;
  product?: Product;
  quantity?: number;
};
export default CartItemType;
