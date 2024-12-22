import React, { useState, useEffect } from 'react';
import styles from './Event.module.css';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [filter, setFilter] = useState('all');
  const [editIndex, setEditIndex] = useState(null);

  const loadEvents = () => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      return JSON.parse(savedEvents);
    }
    return [];
  };

  useEffect(() => {
    const loadedEvents = loadEvents();
    setEvents(loadedEvents);
  }, []);

  const saveEvents = (newEvents) => {
    localStorage.setItem('events', JSON.stringify(newEvents));
  };

  const addEvent = () => {
    if (editIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents[editIndex] = {
        name: eventName,
        start: new Date(startTime),
        end: new Date(endTime)
      };
      setEvents(updatedEvents);
      saveEvents(updatedEvents);
      setEditIndex(null); 
    } else {
      const newEvent = {
        name: eventName,
        start: new Date(startTime),
        end: new Date(endTime)
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      saveEvents(updatedEvents);
    }

    setEventName('');
    setStartTime('');
    setEndTime('');
  };

  const editEvent = (index) => {
    const eventToEdit = events[index];
    setEventName(eventToEdit.name);
    setStartTime(eventToEdit.start.toISOString().slice(0, 16));
    setEndTime(eventToEdit.end.toISOString().slice(0, 16));
    setEditIndex(index);
  };

  const deleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  };

  const filteredEvents = events.filter(event => {
    const now = new Date();
    if (filter === "coming") return event.start > now;
    if (filter === "past") return event.end < now;
    return true;
  });

  filteredEvents.sort((a, b) => a.start - b.start);

  return (
    <div className={styles.Container}>
      <div className={styles.content}>
        <div className={styles.header}>
      <h1 className={styles.title}>My Events</h1>
      <h2 className={styles.subtitle}></h2> 
      </div>

      <div className={styles.nav}>
        <button onClick={() => setFilter('coming')}>Coming Events</button>
        <button onClick={() => setFilter('past')}>Old Events</button>
        <button onClick={() => setFilter('all')}>All Events</button>
      </div>

      <>
      <form onSubmit={(e) => {
        e.preventDefault();
        addEvent();
      }}>
        
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <button type="submit">
          {editIndex !== null ? 'Save Changes' : 'Add Event'}
        </button>
      </form>
      </>
     
      <div className={styles.eventList}>
      <ul className={styles.rutinListMainContainer}>
        {filteredEvents.map((event, index) => {
          const eventClass = event.start > new Date() ? styles.coming : styles.past;
          return (
            <li key={index} className={styles.rutinListContainer}>
              <h3>{event.name}</h3>
              <p>Start: {event.start.toLocaleString()}</p>
              <p>End: {event.end.toLocaleString()}</p>
              <button className={styles.createButton} onClick={() => editEvent(index)}>Edit</button>
              <button className={styles.createButton} onClick={() => deleteEvent(index)}>Remove</button>
            </li>
          );
        })}
      </ul>
      </div>
    </div>
   </div>
  );
};

export default Event;
