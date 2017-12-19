import express from 'express';

import jwt from '../middlewares/jwt';
import City from '../models/cities';

const router = express.Router();

router.use(jwt);

router.get('/', function(req, res) {
    City.find(function(err, cities) {
        if (err) {
            res.send(err);
        }

        res.json(cities);
    });
});

router.post('/', function(req, res) {
    const city = new City();
    city.name = req.body.name;
    city.country = req.body.country;
    city.capital = req.body.capital;
    city.location = req.body.location;
    city.lastModifiedDate = new Date(); 

    city.save(function(err) {
        if (err) {
            res.send(err);
        }

        res.json(city);
    });
});

router.put('/:id', function(req, res) {
    City.findById(req.params.id, function(err, city) {
        if (err) {
            res.send(err);
        }

        if (!city) {
            city = new City();
        }

        city.name = req.params.name;
        city.country = req.params.country;
        city.capital = req.params.capital;
        city.location = req.params.location;
        city.lastModifiedDate = new Date();
          
        city.save((err) => {
            if (err) {
                res.send(err);
            }
            res.json(city);
        });
    });
});

router.delete('/:id', function(req, res) {
    City.findByIdAndRemove(req.params.id, function(err, cities) {
        if (err) {
            res.send(err);
        }

        res.json(cities);
    });
});

export default router;