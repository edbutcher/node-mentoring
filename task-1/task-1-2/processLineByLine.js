const fs = require('fs')
const csv = require('csvtojson')
const showMemoryUsage = require('./showMemoryUsage')
const { pipeline } = require('stream');

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

module.exports = processLineByLine;