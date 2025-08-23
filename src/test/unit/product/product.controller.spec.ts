import { Request, Response, NextFunction } from "express";
import { ProductController } from "../../../modules/product/controller";
import ProductService from "../../../modules/product/service";

jest.mock("../../../modules/product/schema", () => ({
  productSchema: { parse: jest.fn().mockImplementation((x) => x) },
  productParamSchema: { parse: jest.fn().mockImplementation((x) => x) },
  productQuerySchema: { parse: jest.fn().mockImplementation((x) => x) },
}));
jest.mock("../../../modules/product/service");

describe("ProductController", () => {
  let controller: ProductController;
  let service: jest.Mocked<ProductService>;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    service = new ProductService() as jest.Mocked<ProductService>;
    controller = new ProductController(service);
    req = {};
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  describe("createProduct", () => {
    it("should return 201 on success", async () => {
      req.body = { name: "Test" };
      service.create.mockResolvedValue({ name: "Test" } as any);

      await controller.createProduct(req as Request, res as Response, next);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("should call next on error", async () => {
      req.body = {};
      service.create.mockRejectedValue(new Error("fail"));

      await controller.createProduct(req as Request, res as Response, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("updateProduct", () => {
    it("should return 200 with updated product", async () => {
      req.params = { id: "123" };
      req.body = { name: "Updated" };
      service.update.mockResolvedValue({ name: "Updated" } as any);

      await controller.updateProduct(req as Request, res as Response, next);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("listProducts", () => {
    it("should return 200 with products", async () => {
      req.query = { page: "1", limit: "10", search: "" };
      service.getAll.mockResolvedValue({
        products: [{ name: "P1" } as any],
        productCount: 1,
      });

      await controller.listProducts(req as Request, res as Response, next);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("getProduct", () => {
    it("should return 200 with a product", async () => {
      req.params = { id: "123" };
      service.getById.mockResolvedValue({ name: "P1" } as any);

      await controller.getProduct(req as Request, res as Response, next);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("deleteProduct", () => {
    it("should return 200 on delete", async () => {
      req.params = { id: "123" };
      service.delete.mockResolvedValue({} as any);

      await controller.deleteProduct(req as Request, res as Response, next);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
