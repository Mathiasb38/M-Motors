export const EMPTY_OPTIONS = {
  brands: [],
  engines: [],
}

export const PRICE_RANGES = {
  sale: { min: 0, max: 150000, step: 1000 },
  rent: { min: 0, max: 1000, step: 10 },
}

export const DEFAULT_FILTERS = {
  offer_type: 'sale',
  min_price: PRICE_RANGES.sale.min,
  max_price: PRICE_RANGES.sale.max,
  max_mileage: 200000,
  available_now: false,
  price_ranges: {
    sale: {
      min: PRICE_RANGES.sale.min,
      max: PRICE_RANGES.sale.max,
    },
    rent: {
      min: PRICE_RANGES.rent.min,
      max: PRICE_RANGES.rent.max,
    },
  },
}
