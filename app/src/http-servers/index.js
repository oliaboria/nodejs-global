import textServer from './plain-text-server';
import htmlServer from './html-server';
import jsonServer from './json-server';
import echoServer from './echo-server';

textServer.listen('3000',
  () => console.log(`Text server listen on 3000 port;`));

htmlServer.listen('3001',
  () => console.log(`Html server listen on 3001 port;`));

jsonServer.listen('3002',
  () => console.log(`Json server listen on 3002 port;`));

echoServer.listen('3003',
  () => console.log(`Echo server listen on 3003 port;`));