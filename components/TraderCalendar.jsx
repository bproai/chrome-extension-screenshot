import React, { useState, useEffect } from 'react';

const TraderCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', type: 'reminder' });
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Load events from localStorage
    const savedEvents = JSON.parse(localStorage.getItem('traderEvents') || '[]');
    setEvents(savedEvents);
  }, []);

  const saveEvent = (e) => {
    e.preventDefault();
    const updatedEvents = [...events, { ...newEvent, id: Date.now() }];
    setEvents(updatedEvents);
    localStorage.setItem('traderEvents', JSON.stringify(updatedEvents));
    setNewEvent({ title: '', date: '', type: 'reminder' });
  };

  const deleteEvent = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('traderEvents', JSON.stringify(updatedEvents));
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateStr = date.toISOString().split('T')[0];
      const dayEvents = events.filter(event => event.date === dateStr);

      days.push(
        <div key={day} className="calendar-day">
          <div className="day-number">{day}</div>
          {dayEvents.map(event => (
            <div key={event.id} className={`event ${event.type}`}>
              {event.title}
              <button 
                onClick={() => deleteEvent(event.id)}
                className="delete-event"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  return (
    <div className="trader-calendar">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <h2>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>

      <div className="calendar-grid">
        <div className="weekday">Sun</div>
        <div className="weekday">Mon</div>
        <div className="weekday">Tue</div>
        <div className="weekday">Wed</div>
        <div className="weekday">Thu</div>
        <div className="weekday">Fri</div>
        <div className="weekday">Sat</div>
        {renderCalendar()}
      </div>

      <form onSubmit={saveEvent} className="event-form">
        <input
          type="text"
          placeholder="Event title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          required
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          required
        />
        <select
          value={newEvent.type}
          onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
        >
          <option value="reminder">Reminder</option>
          <option value="meeting">Meeting</option>
          <option value="deadline">Deadline</option>
        </select>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default TraderCalendar;