import express from 'express'
import config from 'config'
import logger from './utils/logger'

const port = config.get<number>('port')
const app = express()

app.listen(port, () => {
  logger.info(`App is running at http://localhost:${port}`)
})