import { useEffect, useState } from 'react'
import { Car } from 'lucide-react'

import { getAvailableVehicles } from '../../api/vehiclesApi.js'

import './Catalog.css'


export default Catalog


function Catalog({ filters }) {
  const [vehicles, setVehicles] = useState([])
  const filteredVehicles = vehicles.filter((vehicle) => {
    const price = Number(vehicle.price)
    const minPrice = filters.min_price ?? 0
    const maxPrice = filters.max_price ?? Infinity

    return price >= minPrice && price <= maxPrice
  })

  useEffect(() => {
    getAvailableVehicles(filters)
      .then(setVehicles)
      .catch(() => setVehicles([]))
  }, [filters])

  return (
    <section className="catalog" aria-label="Catalogue de véhicules">
      <div className="catalog-list">
        {filteredVehicles.map((vehicle) => {
          const isAvailable = new Date(vehicle.availability) <= new Date()

          return (
            <article className="catalog-card" key={vehicle.id}>
              <div className="catalog-card-title">
                <h2>{vehicle.brand}</h2>
                <p>{vehicle.model}</p>
              </div>
              <div className="catalog-card-image" aria-hidden="true">
                <Car />
              </div>
              <div className="catalog-card-footer">
                <p className={`catalog-status${isAvailable ? '' : ' catalog-status-unavailable'}`}>
                  {getAvailabilityLabel(vehicle.availability)}
                </p>
                <strong>
                  {vehicle.price}€{vehicle.offer_type === 'rent' ? ' / Mois' : ''}
                </strong>
                <button className="catalog-button-add" type="button">Ajouter</button>
              </div>
            </article>
          )
        })}
      </div>
      <button className="catalog-button-more" type="button">Voir plus</button>
    </section>
  )
}


function getAvailabilityLabel(availability) {
  const availabilityDate = new Date(availability)

  if (availabilityDate <= new Date()) {
    return 'Disponible'
  }

  return `Disponible à partir du ${availabilityDate.toLocaleDateString('fr-FR')}`
}
