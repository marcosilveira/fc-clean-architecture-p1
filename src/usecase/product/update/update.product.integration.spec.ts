import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";


describe("Test update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const usecaseCreate = new CreateProductUseCase(productRepository);
        const usecaseUpdate = new UpdateProductUseCase(productRepository);
        const input = {
            id: "123",
            name: "Product 1",
            price: 10
        }
        const output = {
            id: expect.any(String),
            name: "Product 1",
            price: 10
        }
        const resultCreate = await usecaseCreate.execute(input);
        expect(resultCreate).toEqual(output);
        const inputUpdate = {
            id: resultCreate.id,
            name: "Product 2",
            price: 20
        }
        const resultUpdate = await usecaseUpdate.execute(inputUpdate);
        expect(resultUpdate).toEqual(inputUpdate);
    });

});