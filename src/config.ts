import dotenv from 'dotenv'
dotenv.config()

const PG = {
  User: process.env.PG_USER || '',
  Pass: process.env.PG_PASS || '',
  Host: process.env.PG_HOST || 'localhost',
  Port: process.env.PG_PORT || 5432,
  Base: process.env.PG_BASE || 'base',
  Uri: process.env.PG_URI || null,
}

const DUri = {
  PG: `postgresql://${PG.User}:${PG.Pass}@${PG.Host}:${PG.Port}/${PG.Base}`,
}

const ensureDatabaseInUri = (uri: string | null, defaultDatabase: string) => {
  if (!uri) return null

  try {
    const parsedUri = new URL(uri)
    const path = parsedUri.pathname || ''
    const hasDatabase = path.length > 1

    if (hasDatabase) {
      return uri
    }

    const delimiter = uri.endsWith('/') ? '' : '/'
    return `${uri}${delimiter}${defaultDatabase}`
  } catch (e) {
    return null
  }
}

export const envConfig = {
  pgBase: PG.Base,
  pgUri: ensureDatabaseInUri(PG.Uri, PG.Base) || DUri.PG,
}
