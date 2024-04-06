const { range } = require("lodash");
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const express = require("express")

const BodyParser = require("body-parser");

const Coffeestore = require('./coffeestore');

const products = Coffeestore.LoadProducts();
const discounts = Coffeestore.LoadDiscounts({
    productCodes: products.map(product => product.code)
});

console.log(products);
console.log(discounts);
Coffeestore.SaveDiscounts(...discounts);

const server = express();

server.use(BodyParser.json());

// server.use((req, res, next) => {
//     console.log(`Am trecut pe aici`);
//     next();
// })

server.get('/', (req, res) => {
    res.status(200).json({
        hello: 'world!'
    });
});

server.get('/api/products', (req, res) => {
    res.status(200).json(products);
});

server.post('/api/products', (req, res) => {
    // console.log(req.body);
    const product = req.body; // Aici ai face validari
    products.push(product);

    Coffeestore.SaveProducts(...products);

    res.status(201).send();
});

server.get('/api/discounts', (req, res) => {
    res.status(200).json(discounts);
});

server.post('/api/discounts', (req, res) => {
    // console.log(req.body);
    const discount = req.body; // Aici ai face validari
    
    const exists = products.some(product => product.code === discount.productCode);
    if (!exists) {
        return res.status(400).send(`Invalid product code! Valid product codes are ${products.map(p => p.code).join(', ')}`);
    }

    discounts.push(discount);
    Coffeestore.SaveDiscounts(...discounts);

    res.status(201).send();
});

server.listen(1400, () => {
    console.log(`Server started on port 1400. Please visit http://localhost:1400`);
});
