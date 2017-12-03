import { EventEmitter } from 'events';
import fs from 'fs';

import { events } from '../common/constants';

export class DirWatcher extends EventEmitter {
    watchFile(path, delay = 3000) {
        fs.watch(path, (eventType, filename) => {
            setTimeout(() => {
                this.emit(events.DIR_WATCHER_CHANGED, filename);
            }, delay);
        });
    }
}