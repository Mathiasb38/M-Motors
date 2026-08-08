import { useEffect, useState } from 'react'
import { Car } from 'lucide-react'

import { getAvailableVehicles } from '../../api/vehiclesApi.js'
import { DEFAULT_FILTERS } from '../Filter/filterConfig.js'
import VehicleDetails, {
  getAvailabilityLabel,
  getMileageLabel,
  getPriceLabel,
} from '../VehicleDetails/VehicleDetails.jsx'

import './Catalog.css'


export default Catalog


function Catalog({ filters }) {
  const [vehicles, setVehicles] = useState([])
  const [expandedVehicleId, setExpandedVehicleId] = useState(null)
  const serverFiltersKey = getServerFiltersKey(filters)
  const filteredVehicles = filterVehiclesByPriceAndMileage(vehicles, filters)
  const expandedVehicle = filteredVehicles.find((vehicle) => vehicle.id === expandedVehicleId)

  useEffect(() => {
    getAvailableVehicles(filters)
      .then(setVehicles)
      .catch(() => setVehicles([]))
  }, [serverFiltersKey])

  if (filteredVehicles.length === 0) {
    return (
      <section className="catalog" aria-label="Catalogue de véhicules">
        <p className="catalog-empty">Aucun véhicule ne correspond à votre recherche.</p>
      </section>
    )
  }

  return (
    <section className="catalog" aria-label="Catalogue de véhicules">
      <div className="catalog-list">
        {filteredVehicles.map((vehicle) => {
          const isAvailable = new Date(vehicle.availability) <= new Date()

          return (
            <article
              className="catalog-card"
              key={vehicle.id}
              onClick={() => setExpandedVehicleId(vehicle.id)}
            >
              <div className="catalog-card-title">
                <h2>{vehicle.brand}</h2>
                <p>{vehicle.model}</p>
              </div>
              <p className="catalog-mileage">{getMileageLabel(vehicle.mileage)}</p>
              <div className="catalog-card-image" aria-hidden="true">
                <Car />
              </div>
              <div className="catalog-card-footer">
                <p className={`catalog-status${isAvailable ? '' : ' catalog-status-unavailable'}`}>
                  {getAvailabilityLabel(vehicle.availability)}
                </p>
                <strong>{getPriceLabel(vehicle)}</strong>
                <button className="catalog-button-add" type="button">Réserver</button>
              </div>
            </article>
          )
        })}
      </div>
      {expandedVehicle && (
        <VehicleDetails vehicle={expandedVehicle} onClose={() => setExpandedVehicleId(null)} />
      )}
      <button className="catalog-button-more" type="button">Voir plus</button>
    </section>
  )
}


function getServerFiltersKey(filters) {
  return [
    filters.offer_type,
    filters.brand_id,
    filters.model_id,
    filters.engine_id,
    filters.available_now,
  ].join('|')
}


function filterVehiclesByPriceAndMileage(vehicles, filters) {
  return vehicles.filter((vehicle) => {
    const price = Number(vehicle.price)
    const minPrice = filters.min_price ?? DEFAULT_FILTERS.min_price
    const maxPrice = filters.max_price ?? DEFAULT_FILTERS.max_price
    const maxMileage = filters.max_mileage ?? DEFAULT_FILTERS.max_mileage
    const isMileageValid = vehicle.mileage === null || vehicle.mileage <= maxMileage

    return price >= minPrice && price <= maxPrice && isMileageValid
  })
}


