import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import '../css/Events.css';


const Events = () => {
	const [events, setEvents] = useState([])

	useEffect(() => {
		(async () => {
			try {
				const eventsData = await EventsAPI.getAllEvents()
				setEvents(eventsData)
			}
			catch (error) {
				throw error
			}
		})()
	}, [])

	return (
		<div className='all-events'>
			{
				events && events.length > 0 ? events.map((event) =>
					<Event
						key={event.id}
						id={event.id}
					/>
				) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events available yet!'}</h2>
			}
		</div>
	)
}

export default Events
