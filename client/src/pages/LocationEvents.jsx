import React, { useState, useEffect } from 'react';
import Event from '../components/Event';
import LocationsAPI from '../services/LocationsAPI';
import EventsAPI from '../services/EventsAPI';
import '../css/LocationEvents.css';

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState(null);
    const [events, setEvents] = useState([]);


    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const [locationData, eventsData] = await Promise.all([
                    LocationsAPI.getLocationById(index),
                    EventsAPI.getAllEvents()
                ]);

                setLocation(locationData);
                setEvents(eventsData.filter((event) => event.location_id === index));
            } catch (error) {
                throw error;
            }
        };

        fetchLocationData();
    }, [index]);

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location?.image} />
                </div>

                <div className='location-info'>
                    <h2>{location?.name}</h2>
                    <p>{location?.address}, {location?.city}, {location?.state} {location?.zip}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    );
}

export default LocationEvents;