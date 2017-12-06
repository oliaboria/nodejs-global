import fs from 'fs';
const util = require('util');
require('util.promisify').shim();

import { DirWatcher } from './dirWatcher';
import { events } from '../common/constants';
import { parseCsvToJson } from '../common/helpers';

const readFileAsync = util.promisify(fs.readFile);
const readDirAsync = util.promisify(fs.readdir);

export class Importer {
    async import(path) {
        const filesName = await readDirAsync(path);
        const csvData = await Promise.all(
            filesName.map((file) => {
                return readFileAsync(`${path}/${file}`, { encoding: 'utf8' });
            })
        );

        return parseCsvToJson(csvData[1]); // csvData[0] contain BOM markers
    }

    importSync(path) {
        const filesName = fs.readdirSync(path);
        const csvData = filesName.map((file) => {
            return fs.readFileSync(`${path}/${file}`, { encoding: 'utf8' });
        });

        return parseCsvToJson(csvData[1]); // csvData[0] contain BOM markers
    }
}