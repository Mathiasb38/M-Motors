const API_URL = import.meta.env.VITE_API_URL


export async function createClientAccount(account) {
  const response = await fetch(`${API_URL}/client-accounts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(account),
  })

  if (response.status === 409) {
    throw new Error('Un compte existe déjà avec cet email.')
  }

  if (!response.ok) {
    throw new Error('Impossible de créer le compte.')
  }

  return response.json()
}
