const csv = require('csvtojson');
const { resolve } = require("path");
const { createReadStream, createWriteStream } = require('fs');

function errorHandler(error) {
  console.log(error);
};

function csvToJson(inputPath, outputPath) {
  createReadStream(inputPath)
    .pipe(csv())
    .pipe(createWriteStream(outputPath))
    .on('error', errorHandler);
};

const inputPath = resolve('./csv/node_mentoring_t1_2.csv');
const outputPath = resolve('./text/node_mentoring_t1_2.txt');

csvToJson(inputPath, outputPath);
