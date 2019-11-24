import csv from 'csvtojson';
import { resolve } from 'path';
import { createReadStream, createWriteStream } from 'fs';

export function errorHandler(error) {
  console.log(error);
};

export function csvToJson(inputPath, outputPath) {
  createReadStream(inputPath)
    .pipe(csv())
    .pipe(createWriteStream(outputPath))
    .on('error', errorHandler);
};

const inputPath = resolve('./csv/node_mentoring_t1_2.csv');
const outputPath = resolve('./text/node_mentoring_t1_2.txt');

csvToJson(inputPath, outputPath);

export default csvToJson;