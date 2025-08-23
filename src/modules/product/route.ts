import express from "express";
import ProductService from "./service";
import { ProductController } from "./controller";

const product = express.Router();

const productService = new ProductService();
const productController = new ProductController(productService);

product.post("/", productController.createProduct);

product.get("/", productController.listProducts);

product.get("/:id", productController.getProduct);

product.put("/:id", productController.updateProduct);

product.delete("/:id", productController.deleteProduct);

export default product;
