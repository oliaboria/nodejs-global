#!/usr/bin/env node 

const fs = require('fs');
const yargs = require('yargs');
const path = require('path');
const throught2 = require('through2');
const request = require('request');
const { parseCsvToJson } = require('../common/helpers/helpers');

function inputOutput(filePath) {
    fs.createReadStream(filePath)
      .pipe(process.stdout);
}

function transformToUppercase() {
    return process.stdin
        .pipe(toUpperCase())
        .pipe(process.stdout);
}

function parseFile(filePath) {
    fs.createReadStream(filePath)
        .pipe(convertCsvToJson())
        .pipe(fs.createWriteStream(filePath.replace('.csv', '.json')));
}

function parse(filePath) {
    fs.createReadStream(filePath)
        .pipe(convertCsvToJson())
        .pipe(process.stdout);
}

function toUpperCase() {
    return throught2((chunk, enc, callback) => {
        callback(null, chunk.toString().toUpperCase());
    });
}

function convertCsvToJson() {
    return throught2((chunk, enc, callback) => {
        const dataJson = parseCsvToJson(chunk.toString());
        callback(null, JSON.stringify(dataJson, null, ' '));
    });
}

function bundleCss(dir) {
    const destinationFilename = 'bundle.css';
    const bundle = fs.createWriteStream(`${dir}/${destinationFilename}`);

    fs.readdir(dir, (err, files) => {
        const streams = files
            .filter(file => file !== destinationFilename) 
            .map(file => path.join(dir, file))
            .map(file => fs.createReadStream(file))
            .concat(request('https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css'));

        const write = (streams, dest) => {
            const [ source, ...rest ] = streams;

            if (source) {
                source.pipe(bundle, { end: false });
                source.on('end', () => {
                    write(rest, dest);
                });
            }
        };
        
        write(streams, bundle);
    })
}

const argv = yargs
    .options({
        'help': {
            alias: 'h'
        }
    })
    .command(
        'io',
        'Read the file',
        {
            file: {
                alias: 'f',
                describe: 'path to the file',
                normalize: true,
                demandOption: true,
            },
        },
        (argv) => inputOutput(argv.file)
    )
    .command(
        'transform',
        'transform import to upper case',
        {},
        () => transformToUppercase()
    )
    .command(
       'parse-file',
        'Parse CSV file as JSON',
        {
            file: {
                alias: 'f',
                describe: 'path to the file',
                normalize: true,
                demandOption: true,
            }
        },
        (argv) => parseFile(argv.file)
    )
    .command(
        'parse',
         'Parse CSV file as JSON',
         {
             file: {
                 alias: 'f',
                 describe: 'path to the file',
                 normalize: true,
                 demandOption: true,
             }
         },
         (argv) => parse(argv.file)
     )
     .command(
        'bundle-css',
        'Bundles all css files in the folder into one file',
        {
            path: {
                alias: 'p',
                describe: 'directory with css files to bundle',
                normalize: true,
                demandOption: true,
            }
        },
        (argv) => bundleCss(argv.path)
    )
    .demandCommand(1, 'You need at least one command before moving on')
    .locale('en')
    .version(false)
    .argv;