#!/usr/bin/env node 

const fs = require('fs');
const yargs = require('yargs');
const path = require('path');
const throught2 = require('through2');
const { promisify } = require('util');
const request = require('request');

function inputOutput(filePath) {
    fs.createReadStream(filePath)
      .pipe(process.stdout);
}

function transformToUppercase() {
    return process.stdin
        .pipe(toUpperCase())
        .pipe(process.stdout);
}

function transformFile(filePath) {
    fs.createReadStream(filePath)
        .pipe(fs.createWriteStream(filePath.replace('.csv', '.json')))
}

function toUpperCase(){
    return throught2((chunk, enc, callback) => {
        console.log(chunk.toString().toUpperCase())
        callback();
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
        'Parse CSV input as JSON',
        {},
        () => transformToUppercase()
    )
    .command(
       'transform-file',
        'Parse CSV file as JSON',
        {
            file: {
                alias: 'f',
                describe: 'path to the file',
                normalize: true,
                demandOption: true,
            }
        },
        (argv) => transformFile(argv.file)
    )
    .demandCommand(1, 'You need at least one command before moving on')
    .locale('en')
    .version(false)
    .argv;

module.exports = {
    inputOutput,
    transformFile
}