/*
    Product:
        -> id: string
        -> code: number
        -> name: string
        -> description: string
        -> price: number

        -> discounts calculated dynamically
        
    Discounts:
        -> id: string
        -> code: number
        -> name: string
        -> description: string
        -> productCode: number
        -> discount: number
*/

// import {} from ""

// const UUID = require("uuid")
// const v4 = UUID.v4;

const { v4 } = require("uuid");
const { faker } = require("@faker-js/faker");
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const { sample, range } = require("lodash");

const Product = ({code, name, description, price}) => {
    const id = v4();

    return {
        id, code, name, description, price
    }
};

const MockProduct = () => ({
    id: v4(),
    code: faker.number.int({ min: 1000, max: 9999 }),
    name: faker.science.chemicalElement().name,
    description: faker.lorem.words({ min: 4, max: 20 }),
    price: faker.number.float({ min: 5, max: 25 })
});

const LoadProducts = () => {
    const content = readFileSync(join("products.json"), "utf-8");

    if (content) {
        return JSON.parse(content);
    }

    return range(0, 5).map((element, index) => MockProduct());
}

const SaveProducts = (...products) => {
    writeFileSync(join("products.json"), JSON.stringify(products, null, 4));
}

const Discount = ({code, name, description, productCode, discount}) => {
    const id = v4();

    return {
        id, code, name, description, productCode, discount
    }
};

const MockDiscount = ({ productCode }) => {
    return Discount({
        productCode,
        code: faker.number.int({ min: 1000, max: 9999 }),
        name: faker.animal.dog(),
        description: faker.lorem.words({ min: 4, max: 20 }),
        price: faker.number.float({ min: 5, max: 25 }),
        discount: faker.number.float({ min: 5, max: 50 })
    })
}

const LoadDiscounts = ({ productCodes }) => {
    const content = readFileSync(join("discounts.json"), "utf-8");

    if (content) {
        return JSON.parse(content);
    }

    const code = productCodes[ faker.number.int({ min: 0, max: productCodes.length }) ]
    return range(0, 5).map((element, index) => MockDiscount({
        productCode: code
    }));
}

const SaveDiscounts = (...discounts) => {
    writeFileSync(join("discounts.json"), JSON.stringify(discounts, null, 4));
}

module.exports = {
    Product, MockProduct, LoadProducts, SaveProducts,
    Discount, MockDiscount, LoadDiscounts, SaveDiscounts
};