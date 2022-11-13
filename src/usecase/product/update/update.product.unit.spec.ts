import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";


const product = ProductFactory.create(
    "a",
    "Product 1",
    10
);

const input = {
    id: product.id,
    name: "Product1 Updated",
    price: 12
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for product update use case", () => {

    it("should update a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new UpdateProductUseCase(productRepository);
        
        const output = await productCreateUseCase.execute(input);
        
        expect(output).toEqual(input);
    });



});