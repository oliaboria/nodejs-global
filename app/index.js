import config from './server/config/config';
import { Product , User } from './server/models';

console.log(config.productName);

let user = new User('Olga');
let product = new Product();