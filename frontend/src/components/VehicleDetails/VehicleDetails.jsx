import { useEffect, useState } from 'react'
import { Car, X } from 'lucide-react'

import { getVehicleRentalOptions } from '../../api/vehiclesApi.js'

import './VehicleDetails.css'


export default function VehicleDetails({ vehicle, onClose }) {
  const [rentalOptions, setRentalOptions] = useState([])
  const isAvailable = new Date(vehicle.availability) <= new Date()

  useEffect(() => {
    getVehicleRentalOptions(vehicle.id)
      .then(setRentalOptions)
      .catch(() => setRentalOptions([]))
  }, [vehicle.id])

  return (
    <div className="vehicle-details-overlay" onClick={onClose}>
      <article
        aria-label={`Détails de ${vehicle.brand} ${vehicle.model}`}
        aria-modal="true"
        className="vehicle-details-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="Fermer"
          className="vehicle-details-close"
          onClick={onClose}
          type="button"
        >
          <X />
        </button>
        <div className="vehicle-details-content">
          <div className="vehicle-details-image" aria-hidden="true">
            <Car />
          </div>
          <div className="vehicle-details-info">
            <h2>
              {vehicle.brand} {vehicle.model}
              <span>{vehicle.engine ?? 'Motorisation non renseignée'}</span>
            </h2>
            {rentalOptions.length > 0 && (
              <ul className="vehicle-details-rental-options">
                {rentalOptions.map((option) => (
                  <li key={option.id}>
                    <span>{option.name}</span>
                    <small>{option.is_included ? 'Inclus' : 'Non inclus'}</small>
                  </li>
                ))}
              </ul>
            )}
            <h3>{getMileageLabel(vehicle.mileage)}</h3>
            <strong>{getPriceLabel(vehicle)}</strong>
          </div>
        </div>
        <div className="vehicle-details-actions">
          <p className={`vehicle-details-status${isAvailable ? '' : ' vehicle-details-status-unavailable'}`}>
            {getAvailabilityLabel(vehicle.availability)}
          </p>
          <button className="vehicle-details-reserve" type="button">Réserver</button>
        </div>
      </article>
    </div>
  )
}


export function getMileageLabel(mileage) {
  if (mileage === null) {
    return ' '
  }

  return `${mileage.toLocaleString('fr-FR')} km`
}


export function getAvailabilityLabel(availability) {
  const availabilityDate = new Date(availability)

  if (availabilityDate <= new Date()) {
    return 'Disponible'
  }

  return `Disponible à partir du ${availabilityDate.toLocaleDateString('fr-FR')}`
}


export function getPriceLabel(vehicle) {
  const price = Number(vehicle.price).toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })

  return `${price}${vehicle.offer_type === 'rent' ? ' / Mois' : ''}`
}
