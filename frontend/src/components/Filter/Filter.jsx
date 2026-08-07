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


function Filter() {
  const [selectedType, setSelectedType] = useState('achat')
  const [options, setOptions] = useState(EMPTY_OPTIONS)
  const [prices, setPrices] = useState({
    achat: { min: 0, max: 150000 },
    location: { min: 0, max: 500 },
  })
  const models = options.brands.flatMap((brand) => brand.models)

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
          <select name="brand">
            <option>-</option>
            {options.brands.map((brand) => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </label>
        <label className="filter-field">
          <span>Modèle</span>
          <select name="model">
            <option>-</option>
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
          <input name="availableNow" type="checkbox" />
          <span>Disponible immédiatement</span>
        </label>
      </form>
    </section>
  )
}
