// import config from '../config/config';
// import { events } from './common/constants';
// import { Product, User } from './models';
// import { DirWatcher, Importer } from './modules';

// console.log(config.productName);

// let user = new User('Olga');
// let product = new Product();
// let dirWatcher = new DirWatcher();

// dirWatcher.watchFile(`${__dirname}/data`, 2000);

// const importer = new Importer();

// dirWatcher.on(events.DIR_WATCHER_CHANGED, () => {
//     const data = importer.importSync(`${__dirname}/data`);
  
//     console.log('sync', data);
// });
  
// dirWatcher.on(events.DIR_WATCHER_CHANGED, async () => {
//     const data = await importer.import(`${__dirname}/data`);
  
//     console.log('acync', data);
// });