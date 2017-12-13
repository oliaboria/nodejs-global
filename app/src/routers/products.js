import express from 'express';

import jwt from '../middlewares/jwt';
import products from '../models/products';

const router = express.Router();

router.use(jwt);

function getProductById(id) {
    let product = products.find((product) => {
        return product.id === id;
    });

    return product ? product : {};
}

router.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(products, null, ' '));
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    const product = getProductById(id);

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(product, null, ' '));
});

router.get('/:id/reviews', (req, res) => {
    const id = req.params.id;

    const product = getProductById(id);
    const reviews = product.reviews ? product.reviews : '';

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(reviews.toString());
});

router.post('/', (req, res) => {
    const product = {
        "id": req.body.id,
        "name": req.body.name,
        "brand": req.body.brand,
        "price": req.body.price,
        "reviews": req.body,reviews
    };
    
    products.push(product);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(product, null, ' '));
});
  
export default router;