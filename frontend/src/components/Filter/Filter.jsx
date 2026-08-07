import { useEffect, useState } from 'react'

import { getVehicleOptions } from '../../api/vehiclesApi.js'
import PriceRange from './PriceRange.jsx'
import { DEFAULT_FILTERS, EMPTY_OPTIONS, PRICE_RANGES } from './filterConfig.js'

import './Filter.css'


export default Filter


function Filter({ filters, onChange }) {
  const [options, setOptions] = useState(EMPTY_OPTIONS)
  const selectedType = filters.offer_type === 'rent' ? 'location' : 'achat'
  const models = getVisibleModels(options.brands, filters.brand_id)
  const engines = getVisibleEngines(models, filters.model_id)
  const currentPriceRange = PRICE_RANGES[filters.offer_type]
  const currentPrices = {
    min: filters.min_price ?? currentPriceRange.min,
    max: filters.max_price ?? currentPriceRange.max,
  }

  function updateFilters(updatedFilters) {
    onChange({
      ...filters,
      ...updatedFilters,
    })
  }

  function updateType(offerType) {
    const prices = filters.price_ranges?.[offerType] ?? PRICE_RANGES[offerType]

    updateFilters({
      offer_type: offerType,
      min_price: prices.min,
      max_price: prices.max,
    })
  }

  function updatePrice(name, value) {
    const nextPrices = {
      ...currentPrices,
      [name]: value,
    }

    updateFilters({
      min_price: nextPrices.min,
      max_price: nextPrices.max,
      price_ranges: {
        ...filters.price_ranges,
        [filters.offer_type]: nextPrices,
      },
    })
  }

  useEffect(() => {
    getVehicleOptions()
      .then(setOptions)
      .catch(() => setOptions(EMPTY_OPTIONS))
  }, [])

  return (
    <section className="filter" aria-label="Filtres du catalogue">
      <div className="filter-tabs" aria-label="Type d'offre">
        {/* Sale */}
        <button
          className={`filter-button filter-button-achat-${selectedType === 'achat' ? 'active' : 'inactive'}`}
          type="button" onClick={() => updateType('sale')} > Achat </button>

        {/* Rent */}
        <button
          className={`filter-button filter-button-location-${selectedType === 'location' ? 'active' : 'inactive'}`}
          type="button" onClick={() => updateType('rent')} > Location </button>
      </div>

      <form className="filter-form">

        {/* Brand */}
        <label className="filter-field">
          <span>Marque</span>
          <select
            name="brand"
            value={filters.brand_id ?? ''}
            onChange={(event) => updateFilters({
              brand_id: event.target.value,
              model_id: '',
              engine_id: '',
            })}
          >
            <option value="">-</option>
            {options.brands.map((brand) => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </label>

        {/* Model */}
        <label className="filter-field">
          <span>Modèle</span>
          <select
            name="model"
            value={filters.model_id ?? ''}
            onChange={(event) => updateFilters({
              model_id: event.target.value,
              engine_id: '',
            })}
          >
            <option value="">-</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
        </label>

        {/* Engine */}
        <label className="filter-field">
          <span>Motorisation</span>
          <select
            name="engine"
            value={filters.engine_id ?? ''}
            onChange={(event) => updateFilters({ engine_id: event.target.value })}
          >
            <option value="">-</option>
            {engines.map((engine) => (
              <option key={engine.id} value={engine.id}>{engine.name}</option>
            ))}
          </select>
        </label>

        {/* Mileage */}
        <label className="filter-field">
          <span>Kilométrage max</span>
          <input
            name="maxMileage"
            type="number"
            min="0"
            step="1000"
            value={filters.max_mileage ?? DEFAULT_FILTERS.max_mileage}
            onChange={(event) => updateFilters({ max_mileage: Number(event.target.value) })}
          />
        </label>

        {/* Price */}
        <PriceRange
          prices={currentPrices}
          range={currentPriceRange}
          onChange={updatePrice}
        />

        {/* Availability */}
        <label className="filter-checkbox">
          <input
            checked={filters.available_now ?? false}
            name="availableNow"
            type="checkbox"
            onChange={(event) => updateFilters({ available_now: event.target.checked })}
          />
          <span>Disponible immédiatement</span>
        </label>
        
      </form>
    </section>
  )
}


function getVisibleModels(brands, brandId) {
  const selectedBrand = brands.find((brand) => brand.id === Number(brandId))

  return selectedBrand ? selectedBrand.models : brands.flatMap((brand) => brand.models)
}


function getVisibleEngines(models, modelId) {
  const selectedModel = models.find((model) => model.id === Number(modelId))
  const engines = selectedModel
    ? selectedModel.engines
    : models.flatMap((model) => model.engines)

  return getUniqueEngines(engines)
}


function getUniqueEngines(engines) {
  return engines.filter((engine, index) => (
    engines.findIndex((currentEngine) => currentEngine.id === engine.id) === index
  ))
}
