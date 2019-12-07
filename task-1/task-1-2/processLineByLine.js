import fs from 'fs'
import csv from 'csvtojson'
import showMemoryUsage from './showMemoryUsage'
import { pipeline } from 'stream'

const processLineByLine = (inputPath, outputPath) => {
  const ramInterval = showMemoryUsage();

  pipeline(
    csv().fromStream(
      fs.createReadStream(inputPath, 'utf-8')
    ),
    fs.createWriteStream(outputPath),
    (error) => {
      if (error) {
        console.error('Pipeline failed.', error)
      } else {
        clearInterval(ramInterval);
        console.log('Pipeline succeeded.')
      }
    },
  );
};

export default processLineByLine;