export default PriceRange


function PriceRange({ prices, range, onChange }) {
  const minPosition = (prices.min / range.max) * 100
  const maxPosition = (prices.max / range.max) * 100

  return (
    <div className="filter-field">
      <div className="filter-price-values">
        <output>{prices.min}€</output>
        <output>{prices.max}€</output>
      </div>
      <div className="filter-range">
        <div className="filter-range-track" />
        <div
          className="filter-range-selection"
          style={{
            left: `${minPosition}%`,
            right: `${100 - maxPosition}%`,
          }}
        />
        <input
          name="minPrice"
          type="range"
          min={range.min}
          max={range.max}
          step={range.step}
          value={prices.min}
          onChange={(event) => onChange('min', Math.min(Number(event.target.value), prices.max))}
        />
        <input
          name="maxPrice"
          type="range"
          min={range.min}
          max={range.max}
          step={range.step}
          value={prices.max}
          onChange={(event) => onChange('max', Math.max(Number(event.target.value), prices.min))}
        />
      </div>
    </div>
  )
}
