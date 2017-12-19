import express from 'express';

import jwt from '../middlewares/jwt';
import Product from '../models/product';

const router = express.Router();

router.use(jwt);

router.get('/', (req, res) => {
    Product.find(function(err, products) {
        if (err) {
            res.send(err);
        }

        res.json(products);
    });
});

router.get('/:id', (req, res) => {
    Product.findById(req.params.id, function(err, product) {
        if (err) {
            res.send(err);
        }

        res.json(product);
    });
});

router.get('/:id/reviews', (req, res) => {
    Product.findById(req.params.id, function(err, product) {
        if (err) {
            res.send(err);
        }

        res.json(product.reviews);
    });
});

router.post('/', (req, res) => {
    const product = new Product();

    product.name = req.body.name;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.reviews = req.body.reviews;
    
    product.save(function(err) {
        if (err) {
            res.send(err);
        }

        res.json(product);
    });
});

router.delete('/:id', function(req, res) {
    Product.findByIdAndRemove(req.params.id, function(err, product) {
        if (err) {
            res.send(err);
        }

        res.json(product);
    });
});
  
export default router;