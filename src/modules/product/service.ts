import {
  ResourceAlreadyExists,
  ResourceNotFound,
} from "../../utils/custom-errors";
import Product from "./model";
import { TProduct } from "./type";

class ProductService {
  constructor() {}

  async create(payload: TProduct) {
    const product = await this.getByName(payload.name);
    if (product) {
      throw new ResourceAlreadyExists("Product already exists");
    }
    return await Product.create({ ...payload });
  }

  async getAll(page: number, limit: number, searchQuery: string) {
    const query = searchQuery
      ? { name: { $regex: `^${searchQuery}`, $options: "i" } }
      : {};

    const [products, productCount] = await Promise.all([
      Product.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Product.countDocuments(query),
    ]);

    return { products, productCount };
  }

  async getById(productId: string) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new ResourceNotFound("Product not found");
    }
    return product;
  }

  async getByName(productName: string) {
    const product = await Product.findOne({ name: productName });
    if (!product) {
      throw new ResourceNotFound("Product not found");
    }
    return product;
  }

  async update(productId: string, payload: any) {
    const product = await Product.findByIdAndUpdate(
      productId,
      { ...payload },
      { new: true }
    );
    if (!product) {
      throw new ResourceNotFound("Product not found");
    }
    return product;
  }

  async delete(productId: string) {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      throw new ResourceNotFound("Product not found");
    }
    return product;
  }
}

export default ProductService;
