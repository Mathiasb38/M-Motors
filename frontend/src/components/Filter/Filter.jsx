import { useEffect, useState } from 'react'

import { getVehicleOptions } from '../../api/vehiclesApi.js'
import PriceRange from './PriceRange.jsx'

import './Filter.css'


export default Filter


const EMPTY_OPTIONS = {
  brands: [],
}

const PRICE_RANGES = {
  achat: { min: 0, max: 150000, step: 1000 },
  location: { min: 0, max: 1000, step: 10 },
}


function Filter({ onChange }) {
  const [selectedType, setSelectedType] = useState('achat')
  const [selectedBrandId, setSelectedBrandId] = useState('')
  const [selectedModelId, setSelectedModelId] = useState('')
  const [availableNow, setAvailableNow] = useState(false)
  const [options, setOptions] = useState(EMPTY_OPTIONS)
  const [prices, setPrices] = useState({
    achat: { min: PRICE_RANGES.achat.min, max: PRICE_RANGES.achat.max },
    location: { min: PRICE_RANGES.location.min, max: PRICE_RANGES.location.max },
  })
  const selectedBrand = options.brands.find((brand) => brand.id === Number(selectedBrandId))
  const models = selectedBrand ? selectedBrand.models : options.brands.flatMap((brand) => brand.models)

  function updatePrice(name, value) {
    setPrices((currentPricesByType) => ({
      ...currentPricesByType,
      [selectedType]: {
        ...currentPricesByType[selectedType],
        [name]: value,
      },
    }))
  }

  useEffect(() => {
    getVehicleOptions()
      .then(setOptions)
      .catch(() => setOptions(EMPTY_OPTIONS))
  }, [])

  useEffect(() => {
    const currentPrices = prices[selectedType]

    onChange({
      offer_type: selectedType === 'achat' ? 'sale' : 'rent',
      brand_id: selectedBrandId,
      model_id: selectedModelId,
      min_price: currentPrices.min,
      max_price: currentPrices.max,
      available_now: availableNow,
    })
  }, [selectedType, selectedBrandId, selectedModelId, availableNow, prices, onChange])

  return (
    <section className="filter" aria-label="Filtres du catalogue">
      <div className="filter-tabs" aria-label="Type d'offre">
        <button
          className={`filter-button filter-button-achat-${selectedType === 'achat' ? 'active' : 'inactive'}`}
          type="button"
          onClick={() => setSelectedType('achat')}
        >
          Achat
        </button>
        <button
          className={`filter-button filter-button-location-${selectedType === 'location' ? 'active' : 'inactive'}`}
          type="button"
          onClick={() => setSelectedType('location')}
        >
          Location
        </button>
      </div>
      <form className="filter-form">
        <label className="filter-field">
          <span>Marque</span>
          <select
            name="brand"
            value={selectedBrandId}
            onChange={(event) => {
              setSelectedBrandId(event.target.value)
              setSelectedModelId('')
            }}
          >
            <option value="">-</option>
            {options.brands.map((brand) => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </label>
        <label className="filter-field">
          <span>Modèle</span>
          <select
            name="model"
            value={selectedModelId}
            onChange={(event) => setSelectedModelId(event.target.value)}
          >
            <option value="">-</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
        </label>
        <PriceRange
          prices={prices[selectedType]}
          range={PRICE_RANGES[selectedType]}
          onChange={updatePrice}
        />
        <label className="filter-checkbox">
          <input
            checked={availableNow}
            name="availableNow"
            type="checkbox"
            onChange={(event) => setAvailableNow(event.target.checked)}
          />
          <span>Disponible immédiatement</span>
        </label>
      </form>
    </section>
  )
}
