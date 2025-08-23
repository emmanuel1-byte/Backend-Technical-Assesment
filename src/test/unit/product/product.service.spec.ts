import {
  ResourceNotFound,
  ResourceAlreadyExists,
} from "../../../utils/custom-errors";
import Product from "../../../modules/product/model";
import ProductService from "../../../modules/product/service";

jest.mock("../../../modules/product/model"); // mock mongoose model

describe("ProductService", () => {
  let service: ProductService;

  beforeEach(() => {
    service = new ProductService();
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create product if it does not exist", async () => {
      jest.spyOn(service, "getByName").mockResolvedValueOnce(null as any);
      (Product.create as jest.Mock).mockResolvedValue({ name: "Test" });

      const result = await service.create({ name: "Test" } as any);
      expect(Product.create).toHaveBeenCalledWith({ name: "Test" });
      expect(result).toEqual({ name: "Test" });
    });

    it("should throw if product exists", async () => {
      jest
        .spyOn(service, "getByName")
        .mockResolvedValueOnce({ name: "Test" } as any);

      await expect(service.create({ name: "Test" } as any)).rejects.toThrow(
        ResourceAlreadyExists
      );
    });
  });

  describe("getAll", () => {
    it("should return products with count", async () => {
      (Product.find as jest.Mock).mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([{ name: "P1" }]),
      });
      (Product.countDocuments as jest.Mock).mockResolvedValue(1);

      const result = await service.getAll(1, 10, "");
      expect(result.products).toHaveLength(1);
      expect(result.productCount).toBe(1);
    });
  });

  describe("getById", () => {
    it("should return product if found", async () => {
      (Product.findById as jest.Mock).mockResolvedValue({ name: "P1" });
      const result = await service.getById("123");
      expect(result.name).toBe("P1");
    });

    it("should throw if not found", async () => {
      (Product.findById as jest.Mock).mockResolvedValue(null);
      await expect(service.getById("123")).rejects.toThrow(ResourceNotFound);
    });
  });

  describe("update", () => {
    it("should update product", async () => {
      (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        name: "Updated",
      });
      const result = await service.update("123", { name: "Updated" });
      expect(result.name).toBe("Updated");
    });

    it("should throw if not found", async () => {
      (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
      await expect(service.update("123", {})).rejects.toThrow(ResourceNotFound);
    });
  });

  describe("delete", () => {
    it("should delete product", async () => {
      (Product.findByIdAndDelete as jest.Mock).mockResolvedValue({
        name: "Deleted",
      });
      const result = await service.delete("123");
      expect(result.name).toBe("Deleted");
    });

    it("should throw if not found", async () => {
      (Product.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
      await expect(service.delete("123")).rejects.toThrow(ResourceNotFound);
    });
  });
});
