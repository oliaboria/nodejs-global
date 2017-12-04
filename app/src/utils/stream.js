#!/usr/bin/env node 

const fs = require('fs');
const yargs = require('yargs');
const path = require('path');
const throught2 = require('through2');
const { promisify } = require('util');
const request = require('request');
const {parseCsvToJson} = require('../common/helpers/helpers');

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
    .demandCommand(1, 'You need at least one command before moving on')
    .locale('en')
    .version(false)
    .argv;