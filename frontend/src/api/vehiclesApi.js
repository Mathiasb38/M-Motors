const API_URL = import.meta.env.VITE_API_URL


export async function getAvailableVehicles() {
  const response = await fetch(`${API_URL}/vehicles/available`)

  if (!response.ok) {
    return []
  }

  return response.json()
}


export async function getVehicleOptions() {
  const response = await fetch(`${API_URL}/vehicles/options`)

  if (!response.ok) {
    return {
      brands: [],
    }
  }

  return response.json()
}
