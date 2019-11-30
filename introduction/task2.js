const processLineByLine = require('./processLineByLine')
const { resolve } = require('path')

const inputPath = resolve('./csv/node_mentoring_t1_2.csv')
const outputPath = resolve('./text/node_mentoring_t1_2.txt')
processLineByLine(inputPath, outputPath)
