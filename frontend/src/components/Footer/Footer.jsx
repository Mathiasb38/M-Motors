import logo from '../../assets/logo-m-motors.png'
import './Footer.css'


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a className="footer-logo" href="/">
          <img src={logo} alt="M-Motors" />
        </a>
        <nav className="footer-nav" aria-label="Navigation secondaire">
          <section className="footer-column">
            <h2>Services</h2>
            <ul>
              <li>Achat</li>
              <li>Location</li>
              <li>FAQ</li>
            </ul>
          </section>
          <section className="footer-column">
            <h2>Informations légales</h2>
            <ul>
              <li>Mentions légales</li>
              <li>Politique de confidentialité</li>
              <li>Gestion des cookies</li>
            </ul>
          </section>
        </nav>
      </div>
      <hr className="footer-separator" />
      <p className="footer-copyright">M-Motors tous droits réservés</p>
    </footer>
  )
}
