import { model, Schema } from "mongoose";
import { TProduct } from "./type";

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = model<TProduct>("products", productSchema);

export default Product;
