import { sql } from '@ts-safeql/sql-tag'
import db from 'src/db.js'
import type { Postgres_v2 } from 'src/types/index.js'
import type { campaigns_prices_v2, Postgres } from 'src/types/postgres.types.js'

class Prices_PG_Repository {
  async getCampaignsPrices() {
    //  problem
    const result = await db.query<Postgres.campaigns_prices_v1>(
      sql`SELECT * FROM public.campaigns_prices;`,
    )

    // no problem
    const result_2 = await db.query<campaigns_prices_v2>(
      sql`SELECT * FROM public.campaigns_prices;`,
    )

    // problem
    const result_3 = await db.query<Postgres_v2.campaigns_prices_v2>(
      sql`SELECT * FROM public.campaigns_prices;`,
    )

    return { result, result_2, result_3 }
  }
}

export const prices_PG_Repository = new Prices_PG_Repository()
