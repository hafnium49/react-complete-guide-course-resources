/**
 * ============================================================================
 * BACKEND API SERVER (Node.js + Express)
 * ============================================================================
 *
 * LESSON 410 - PROJECT SETUP
 *
 * This file provides a REST API for the Events application.
 * It's written in Node.js with Express.js framework.
 *
 * INSTRUCTOR QUOTE:
 * "This backend folder contains a separate non-React project that will
 * provide us a dummy backend to talk to. This is written with Node and
 * ExpressJS, and it's all in one file basically, in this app.js file."
 *
 * INSTRUCTOR QUOTE:
 * "You don't need to know NodeJS and ExpressJS, because that's why I am
 * providing this starting project to you so that you don't have to write
 * all this code on your own."
 *
 * ============================================================================
 * API ENDPOINTS OVERVIEW
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  METHOD   PATH              DESCRIPTION                                 │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │  GET      /events           List all events (supports ?max= and ?search=)│
 * │  GET      /events/:id       Get single event by ID                      │
 * │  POST     /events           Create a new event                          │
 * │  PUT      /events/:id       Update an existing event                    │
 * │  DELETE   /events/:id       Delete an event                             │
 * │  GET      /events/images    Get list of available images                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * HOW TANSTACK QUERY WILL USE THESE ENDPOINTS
 * ============================================================================
 *
 * FETCHING (useQuery):
 * - GET /events        → useQuery to fetch events list
 * - GET /events/:id    → useQuery to fetch single event details
 * - GET /events/images → useQuery to fetch available images
 *
 * MUTATING (useMutation):
 * - POST /events       → useMutation to create new event
 * - PUT /events/:id    → useMutation to update event
 * - DELETE /events/:id → useMutation to delete event
 *
 * ============================================================================
 * TO START THIS SERVER
 * ============================================================================
 *
 * cd backend && npm start
 *
 * The server will run on http://localhost:3000
 *
 * ============================================================================
 */

import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  next();
});

app.get('/events', async (req, res) => {
  const { max, search } = req.query;
  const eventsFileContent = await fs.readFile('./data/events.json');
  let events = JSON.parse(eventsFileContent);

  if (search) {
    events = events.filter((event) => {
      const searchableText = `${event.title} ${event.description} ${event.location}`;
      return searchableText.toLowerCase().includes(search.toLowerCase());
    });
  }

  if (max) {
    events = events.slice(events.length - max, events.length);
  }

  res.json({
    events: events.map((event) => ({
      id: event.id,
      title: event.title,
      image: event.image,
      date: event.date,
      location: event.location,
    })),
  });
});

app.get('/events/images', async (req, res) => {
  const imagesFileContent = await fs.readFile('./data/images.json');
  const images = JSON.parse(imagesFileContent);

  res.json({ images });
});

app.get('/events/:id', async (req, res) => {
  const { id } = req.params;

  const eventsFileContent = await fs.readFile('./data/events.json');
  const events = JSON.parse(eventsFileContent);

  const event = events.find((event) => event.id === id);

  if (!event) {
    return res
      .status(404)
      .json({ message: `For the id ${id}, no event could be found.` });
  }

  setTimeout(() => {
    res.json({ event });
  }, 1000);
});

app.post('/events', async (req, res) => {
  const { event } = req.body;

  if (!event) {
    return res.status(400).json({ message: 'Event is required' });
  }

  console.log(event);

  if (
    !event.title?.trim() ||
    !event.description?.trim() ||
    !event.date?.trim() ||
    !event.time?.trim() ||
    !event.image?.trim() ||
    !event.location?.trim()
  ) {
    return res.status(400).json({ message: 'Invalid data provided.' });
  }

  const eventsFileContent = await fs.readFile('./data/events.json');
  const events = JSON.parse(eventsFileContent);

  const newEvent = {
    id: Math.round(Math.random() * 10000).toString(),
    ...event,
  };

  events.push(newEvent);

  await fs.writeFile('./data/events.json', JSON.stringify(events));

  res.json({ event: newEvent });
});

app.put('/events/:id', async (req, res) => {
  const { id } = req.params;
  const { event } = req.body;

  if (!event) {
    return res.status(400).json({ message: 'Event is required' });
  }

  if (
    !event.title?.trim() ||
    !event.description?.trim() ||
    !event.date?.trim() ||
    !event.time?.trim() ||
    !event.image?.trim() ||
    !event.location?.trim()
  ) {
    return res.status(400).json({ message: 'Invalid data provided.' });
  }

  const eventsFileContent = await fs.readFile('./data/events.json');
  const events = JSON.parse(eventsFileContent);

  const eventIndex = events.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }

  events[eventIndex] = {
    id,
    ...event,
  };

  await fs.writeFile('./data/events.json', JSON.stringify(events));

  setTimeout(() => {
    res.json({ event: events[eventIndex] });
  }, 1000);
});

app.delete('/events/:id', async (req, res) => {
  const { id } = req.params;

  const eventsFileContent = await fs.readFile('./data/events.json');
  const events = JSON.parse(eventsFileContent);

  const eventIndex = events.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }

  events.splice(eventIndex, 1);

  await fs.writeFile('./data/events.json', JSON.stringify(events));

  setTimeout(() => {
    res.json({ message: 'Event deleted' });
  }, 1000);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
