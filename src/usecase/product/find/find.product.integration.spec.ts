import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import FindProductUseCase from "./find.product.usecase";

describe("Test find product use case", () => {
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

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const usecaseCreate = new CreateProductUseCase(productRepository);
        const usecase = new FindProductUseCase(productRepository);
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
        const resulteCreate = await usecaseCreate.execute(input);
        expect(resulteCreate).toEqual(output);
        input.id = resulteCreate.id;
        const resultFind = await usecase.execute(input);
        expect(resultFind).toEqual(output);
    });

});