import { Car } from 'lucide-react' // Temporaire

import './Catalog.css'


export default Catalog


function Catalog() {
  return (
    <section className="catalog" aria-label="Catalogue de véhicules">
      <div className="catalog-list">
        {/* Cartes véhicules temporaires */}
        <article className="catalog-card">
          <div className="catalog-card-title">
            <h2>Marque</h2>
            <p>Modèle</p>
          </div>
          <div className="catalog-card-image" aria-hidden="true">
            <Car />
          </div>
          <div className="catalog-card-footer">
            <p className="catalog-status">Disponible</p>
            <strong>€xx/ Jour</strong>
            <button className="catalog-button-add" type="button">Ajouté</button>
          </div>
        </article>

        <article className="catalog-card">
          <div className="catalog-card-title">
            <h2>Marque</h2>
            <p>Modèle</p>
          </div>
          <div className="catalog-card-image" aria-hidden="true">
            <Car />
          </div>
          <div className="catalog-card-footer">
            <p className="catalog-status">Disponible</p>
            <strong>€xx/ Jour</strong>
            <button className="catalog-button-add" type="button">Ajouté</button>
          </div>
        </article>

        <article className="catalog-card">
          <div className="catalog-card-title">
            <h2>Marque</h2>
            <p>Modèle</p>
          </div>
          <div className="catalog-card-image" aria-hidden="true">
            <Car />
          </div>
          <div className="catalog-card-footer">
            <p className="catalog-status catalog-status-unavailable">Disponible à partir du jj/mm/aaaa</p>
            <strong>€xx/ Jour</strong>
            <button className="catalog-button-add" type="button">Ajouté</button>
          </div>
        </article>

        <article className="catalog-card">
          <div className="catalog-card-title">
            <h2>Marque</h2>
            <p>Modèle</p>
          </div>
          <div className="catalog-card-image" aria-hidden="true">
            <Car />
          </div>
          <div className="catalog-card-footer">
            <p className="catalog-status">Disponible</p>
            <strong>€xx/ Jour</strong>
            <button className="catalog-button-add" type="button">Ajouté</button>
          </div>
        </article>
        {/* Fin cartes véhicules temporaires */}
      </div>
      <button className="catalog-button-more" type="button">Voir plus</button>
    </section>
  )
}
