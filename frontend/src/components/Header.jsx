import logo from '../assets/logo-m-motors.png'


export default function Header() {
  return (
    <header>
      <a href="/">
        <img src={logo} alt="M-Motors" />
      </a>
      <div className="header-actions">
        <button type="button" aria-label="Notifications">
          <span className="notification-indicator" aria-hidden="true" />
        </button>
        <button type="button" aria-label="Options" />
        <button type="button" aria-label="Profil" />
      </div>
    </header>
  )
}
