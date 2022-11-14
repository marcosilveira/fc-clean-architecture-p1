import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
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

    it("should list a product", async () => {
        const product1 = {
            id: "1",
            name: "Product 1",
            price: 10
        }
        const product2 = {
            id: "2",
            name: "Product 2",
            price: 20
        }
        const productRepository = new ProductRepository();
        const usecaseCreate = new CreateProductUseCase(productRepository);
        const usecaseList = new ListProductUseCase(productRepository);
        let resultCreate = await usecaseCreate.execute(product1);
        expect(resultCreate.name).toBe(product1.name);
        expect(resultCreate.price).toBe(product1.price);
        resultCreate = await usecaseCreate.execute(product2);
        expect(resultCreate.name).toBe(product2.name);
        expect(resultCreate.price).toBe(product2.price);
        const resultList = await usecaseList.execute({});
        expect(resultList.products.length).toBe(2);
        expect(resultList.products[0].name).toBe(product1.name);
        expect(resultList.products[0].price).toBe(product1.price);
        expect(resultList.products[1].name).toBe(product2.name);
        expect(resultList.products[1].price).toBe(product2.price);
    });

});