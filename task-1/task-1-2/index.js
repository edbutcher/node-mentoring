import processLineByLine from './processLineByLine'
import { resolve } from 'path'

const inputPath = resolve('task-1/task-1-2/csv/node_mentoring_t1_2.csv')
const outputPath = resolve('task-1/task-1-2/text/node_mentoring_t1_2.txt')

processLineByLine(inputPath, outputPath)
