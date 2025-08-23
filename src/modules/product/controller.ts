import { Request, Response, NextFunction } from "express";
import ProductService from "./service";
import {
  productParamSchema,
  productQuerySchema,
  productSchema,
} from "./schema";

export class ProductController {
  constructor(private productService: ProductService) {}

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedRequestPayload = productSchema.parse(req.body);

      const product = await this.productService.create(validatedRequestPayload);
      return res.status(201).json({ success: true, data: { product } });
    } catch (err: any) {
      next(err);
    }
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = productParamSchema.parse(req.params);
      const validatedRequestPayload = productSchema.parse(req.body);

      const product = await this.productService.update(
        id,
        validatedRequestPayload
      );
      return res.status(200).json({ success: true, data: { product } });
    } catch (err: any) {
      next(err);
    }
  };

  listProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, search } = productQuerySchema.parse(req.query);

      const { products, productCount } = await this.productService.getAll(
        page,
        limit,
        search
      );

      return res.status(200).json({
        success: true,
        data: {
          products,
          pagination: {
            total: productCount,
            page,
            limit,
            totalPages: Math.ceil(productCount / limit),
          },
        },
      });
    } catch (err: any) {
      next(err);
    }
  };

  getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = productParamSchema.parse(req.params);

      const product = await this.productService.getById(id);
      return res.status(200).json({ success: true, data: { product } });
    } catch (err: any) {
      next(err);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = productParamSchema.parse(req.params);

      await this.productService.delete(id);
      return res
        .status(200)
        .json({ success: false, message: "Product deleted successfully" });
    } catch (err: any) {
      next(err);
    }
  };
}
