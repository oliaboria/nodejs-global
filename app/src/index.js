import config from '../config/config';
import { Product, User } from './models';

console.log(config.productName);

let user = new User('Olga');
let product = new Product();