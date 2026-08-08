const API_URL = import.meta.env.VITE_API_URL


export async function getAvailableVehicles(filters = {}) {
  const params = new URLSearchParams()

  if (filters.offer_type) params.set('offer_type', filters.offer_type)
  if (filters.brand_id) params.set('brand_id', filters.brand_id)
  if (filters.model_id) params.set('model_id', filters.model_id)
  if (filters.engine_id) params.set('engine_id', filters.engine_id)
  if (filters.available_now) params.set('available_now', filters.available_now)

  const query = params.toString()
  const response = await fetch(`${API_URL}/vehicles/available${query ? `?${query}` : ''}`)

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
      engines: [],
    }
  }

  return response.json()
}


export async function getVehicleRentalOptions(vehicleId) {
  const response = await fetch(`${API_URL}/vehicles/${vehicleId}/rental-options`)

  if (!response.ok) {
    return []
  }

  return response.json()
}
