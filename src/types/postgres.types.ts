// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Postgres {
  export interface campaigns_prices_v1 {
    campaign_price_id: number
    campaign_id: number | null
    country: string
    pricing_type: number
    price: number
  }
}

export interface campaigns_prices_v2 {
  campaign_price_id: number
  campaign_id: number | null
  country: string
  pricing_type: number
  price: number
}
