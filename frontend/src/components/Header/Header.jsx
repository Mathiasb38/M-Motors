import { Bell, Settings, UserRound } from 'lucide-react'

import logo from '../../assets/logo-m-motors.png'
import './Header.css'


export default Header


function Header() {
  return (
    <header className="header">
      <a className="header-logo" href="/">
        <img src={logo} alt="M-Motors" />
      </a>
      <div className="header-actions">
        <button className="header-action" type="button" aria-label="Notifications">
          <Bell aria-hidden="true" />
          <span className="notification-indicator" aria-hidden="true" />
        </button>
        <button className="header-action" type="button" aria-label="Options">
          <Settings aria-hidden="true" />
        </button>
        <button className="header-action header-profile" type="button" aria-label="Profil">
          <UserRound aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
