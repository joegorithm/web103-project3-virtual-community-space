import dotenv from 'dotenv';
dotenv.config();
import { pool } from './database.js';
import locationsData from '../data/locations.js';
import eventsData from '../data/events.js';

const createLocationsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id   SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state CHAR(2) NOT NULL,
            zip VARCHAR(10) NOT NULL,
            image VARCHAR(255) NOT NULL
        )
    `;

    try {
        await pool.query(createTableQuery);
        console.log('🎉 locations table created successfully');
    } catch (err) {
        console.error('⚠️ error creating locations table', err);
    }
}

const createEventsTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS events (
            id          SERIAL PRIMARY KEY,
            title       VARCHAR(255) NOT NULL,
            date        DATE NOT NULL,
            time        TIME NOT NULL,
            image       VARCHAR(255) NOT NULL,
            location_id INTEGER REFERENCES locations(id)
        )
    `;

    try {
        await pool.query(createTableQuery);
        console.log('🎉 events table created successfully');
    } catch (err) {
        console.error('⚠️ error creating events table', err);
    }
}

const seedLocationsTable = async () => {
    for (const location of locationsData) {
        const insertQuery = {
            text: 'INSERT INTO locations (name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6)'
        };

        const values = [
            location.name,
            location.address,
            location.city,
            location.state,
            location.zip,
            location.image
        ];

        try {
            await pool.query(insertQuery, values);
            console.log(`✅ ${location.name} added successfully`);
        } catch (err) {
            console.error(`⚠️ error inserting location ${location.name}`, err);
        }
    }
}

const seedEventsTable = async () => {
    for (const event of eventsData) {
        const insertQuery = {
            text: 'INSERT INTO events (title, date, time, image, location_id) VALUES ($1, $2, $3, $4, $5)'
        };

        const values = [
            event.title,
            event.date,
            event.time,
            event.image,
            event.location_id
        ];

        try {
            await pool.query(insertQuery, values);
            console.log(`✅ ${event.title} added successfully`);
        } catch (err) {
            console.error(`⚠️ error inserting event ${event.title}`, err);
        }
    }
}

const setup = async () => {
    await createLocationsTable();
    await createEventsTable();
    await seedLocationsTable();
    await seedEventsTable();
}

setup();