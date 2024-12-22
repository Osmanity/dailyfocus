import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/userContext";

const Event = () => {
  // const [events, setEvents] = useState([]);
  // const [events, setEvents] = useContext(UserContext);
  const { events, setEvents } = useContext(UserContext);

  console.log(events);

  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [filter, setFilter] = useState("all");
  const [editIndex, setEditIndex] = useState(null);

  const loadEvents = () => {
    const savedEvents = localStorage.getItem("events");
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
    localStorage.setItem("events", JSON.stringify(newEvents));
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

    setEventName("");
    setStartTime("");
    setEndTime("");
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

  const filteredEvents = events.filter((event) => {
    const now = new Date();
    if (filter === "coming") return event.start > now;
    if (filter === "past") return event.end < now;
    return true;
  });

  filteredEvents.sort((a, b) => a.start - b.start);

  return (
    <div className={styles.eventContainer}>
      <h2>Event-Calendar</h2>

      <form onSubmit={addEvent}>
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
        <button onClick="AddEvent">
          {editIndex !== null ? "Save Changes" : "Add Event"}
        </button>
      </form>

      <div>
        <button onClick={() => setFilter("coming")}>Coming Events</button>
        <button onClick={() => setFilter("past")}>Old Events</button>
        <button onClick={() => setFilter("all")}>All Events</button>
      </div>

      <ul className={styles.eventList}>
        {filteredEvents.map((event, index) => {
          const eventClass = event.start > new Date() ? "coming" : "past";
          return (
            <li key={index} className={`${styles.eventItem} ${eventClass}`}>
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

export default Event;
