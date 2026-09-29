import { useState } from 'react'
import { X } from 'lucide-react'

import { createClientAccount } from '../../api/clientAccountsApi.js'

import './CreateAccount.css'


export default function CreateAccount({ onClose }) {
  const [feedback, setFeedback] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    if (formData.get('password') !== formData.get('password_confirmation')) {
      setFeedback({ type: 'error', message: 'Les mots de passe ne correspondent pas.' })
      return
    }

    setFeedback(null)
    setIsSubmitting(true)

    try {
      await createClientAccount({
        email: formData.get('email'),
        password: formData.get('password'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        birth_date: formData.get('birth_date'),
      })
      form.reset()
      setFeedback({ type: 'success', message: 'Compte créé.' })
    } catch (error) {
      setFeedback({ type: 'error', message: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <section
        aria-labelledby="create-account-title"
        aria-modal="true"
        className="modal create-account-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button className="modal-close" type="button" aria-label="Fermer" onClick={onClose}>
          <X />
        </button>
        <h2 id="create-account-title">Créer un compte</h2>
        <form className="create-account-form" onSubmit={handleSubmit}>
          <div className="create-account-name-fields">
            <label>
              Prénom
              <input name="first_name" type="text" maxLength="100" autoComplete="given-name" required />
            </label>
            <label>
              Nom
              <input name="last_name" type="text" maxLength="100" autoComplete="family-name" required />
            </label>
          </div>
          <label>
            Email
            <input name="email" type="email" maxLength="255" autoComplete="email" required />
          </label>
          <label>
            Date de naissance
            <input name="birth_date" type="date" max={getMaximumBirthDate()} required />
          </label>
          <label>
            Mot de passe
            <input
              name="password"
              type="password"
              minLength="8"
              maxLength="128"
              autoComplete="new-password"
              required
            />
          </label>
          <label>
            Confirmer le mot de passe
            <input
              name="password_confirmation"
              type="password"
              minLength="8"
              maxLength="128"
              autoComplete="new-password"
              required
            />
          </label>
          {feedback && (
            <p className={`create-account-feedback create-account-feedback-${feedback.type}`} aria-live="polite">
              {feedback.message}
            </p>
          )}
          <button className="create-account-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Création...' : 'Créer mon compte'}
          </button>
        </form>
      </section>
    </div>
  )
}


function getMaximumBirthDate() {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 18)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
