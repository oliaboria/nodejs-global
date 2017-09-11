const config = require('./server/config/config');
const models = require('./server/models');

console.log(config.productName);

let user = new models.User('Olga');
let product = new models.Product();