to create sql table
sql```
CREATE TABLE IF NOT EXISTS public.campaigns_prices
( campaign_price_id integer NOT NULL, campaign_id integer DEFAULT 0, country character(2) DEFAULT ''::bpchar NOT NULL, pricing_type integer DEFAULT 0 NOT NULL, price double precision DEFAULT 0 NOT NULL );

```

```
