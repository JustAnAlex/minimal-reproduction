import { envConfig } from 'src/config.js'
import pg from 'pg'

const pSql = new pg.Pool({
  connectionString: envConfig.pgUri,
  database: envConfig.pgBase,
})

export default pSql
