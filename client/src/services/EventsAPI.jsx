const API_BASE = '/events'

const request = async (path = '') => {
	const response = await fetch(`${API_BASE}${path}`)

	if (!response.ok) {
		throw new Error(`Events API request failed with status ${response.status}`)
	}

	return response.json()
}

const getAllEvents = async () => request()

const getEventById = async (eventId) => request(`/${eventId}`)

export default {
	getAllEvents,
	getEventById,
	getEventsById: getEventById
}
