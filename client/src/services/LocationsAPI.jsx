const API_BASE = '/locations'

const request = async (path = '') => {
	const response = await fetch(`${API_BASE}${path}`)

	if (!response.ok) {
		throw new Error(`Locations API request failed with status ${response.status}`)
	}

	return response.json()
}

const getAllLocations = async () => request()

const getLocationById = async (locationId) => request(`/${locationId}`)

export default {
	getAllLocations,
	getLocationById
}
