import express from 'express';

import jwt from '../middlewares/jwt';
import { Product } from '../models/models';

const router = express.Router();

router.use(jwt);

router.get('/', (req, res) => {
    Product
        .all()
        .then((products) => res.status(200).send(products))
        .catch((error) => res.status(400).send(error));
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Product
        .findById(id)
        .then((product) => {
            if (!product) {
                res.status(404).send({message: 'No such product'});
            }

            res.status(200).send(product);
        })
        .catch((error) => res.status(400).send(error));
});

router.get('/:id/reviews', (req, res) => {
    const id = req.params.id;

    Product
        .findById(id)
        .then((product) => {
            if (!product) {
                res.status(404).send({message: 'No reviews for this product'});
            }

            res.status(200).send(JSON.stringify(product.reviews));
        })
        .catch((error) => res.status(400).send(error));

});

router.post('/', (req, res) => {
    const product = {
        "name": req.body.name,
        "brand": req.body.brand,
        "price": req.body.price,
        "reviews": req.body,reviews
    };
    
    Product.create(product)
        .then(product => res.status(201).send(product))
        .catch(error => res.status(400).send(error));
});
  
export default router;