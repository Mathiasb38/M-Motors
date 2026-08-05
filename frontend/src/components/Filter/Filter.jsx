import { useState } from 'react'

import './Filter.css'


export default Filter


function Filter() {
  const [selectedType, setSelectedType] = useState('achat')

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
          </select>
        </label>
        <label className="filter-field">
          <span>Modèle</span>
          <select name="model">
            <option>-</option>
          </select>
        </label>
        <label className="filter-field">
          <span>Prix</span>
          <select name="price">
            <option>-</option>
          </select>
        </label>
        <label className="filter-field">
          <span>Date</span>
          <select name="date">
            <option>-</option>
          </select>
        </label>
      </form>
    </section>
  )
}
