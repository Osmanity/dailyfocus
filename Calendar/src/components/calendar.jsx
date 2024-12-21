import React, { useState, useEffect } from 'react';

const Calendar = () => {
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
        end: new Date(endTime),
      };
      setEvents(updatedEvents);
      saveEvents(updatedEvents);
      setEditIndex(null); 
    } else {
      const newEvent = {
        name: eventName,
        start: new Date(startTime),
        end: new Date(endTime),
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
    if (filter === 'upcoming') return event.start > now;
    if (filter === 'past') return event.end < now;
    return true;
  });

  filteredEvents.sort((a, b) => a.start - b.start);

  return (
    <div>
      <h2>Event-Calendar</h2>

      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <button onClick={addEvent}>
        {editIndex !== null ? 'Save Changes' : 'Add Event'}
      </button>

      <div>
        <button onClick={() => setFilter('upcoming')}>Coming Events</button>
        <button onClick={() => setFilter('past')}>Old Events</button>
        <button onClick={() => setFilter('all')}>All Events</button>
      </div>

      <ul>
        {filteredEvents.map((event, index) => {
          const eventClass = event.start > new Date() ? 'upcoming' : 'past';
          return (
            <li key={index} className={eventClass}>
              <h3>{event.name}</h3>
              <p>Start: {event.start.toLocaleString()}</p>
              <p>End: {event.end.toLocaleString()}</p>
              <button onClick={() => editEvent(index)}>Edit</button>
              <button onClick={() => deleteEvent(index)}>Remove</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Calendar;