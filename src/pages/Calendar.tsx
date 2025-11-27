import { useEffect, useState } from 'react';
import * as FullCalendar from '@fullcalendar/react';
import * as dayGridPlugin from '@fullcalendar/daygrid';
import * as timeGridPlugin from '@fullcalendar/timegrid';
import * as interactionPlugin from '@fullcalendar/interaction';
import { fetchTrainings } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Training } from '../types';

export default function Calendar() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTrainings()
      .then((data) => setTrainings(data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

    const events = trainings.map(t => {
        const start = new Date(t.date);
        const end = new Date(start.getTime() + t.duration * 60000);

        return {
            title: `${t.activity} (${t.customer?.firstname} ${t.customer?.lastname}) `,
            start: start,
            end: end,
            allDay: false,
            extendedProps: {
                duration: t.duration
            }
        };
    });


  return (
    <div style={{ marginLeft: 20 }}>
      <h2>Training Calendar</h2>
        <FullCalendar.default
        plugins={[dayGridPlugin.default, timeGridPlugin.default, interactionPlugin.default]}
        initialView="dayGridMonth"
        locale="en-GB"
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
        displayEventTime={true}
        displayEventEnd={true}
        eventClick={(info) => {
            alert(
                `Activity: ${info.event.title}\n` +
                `Start: ${info.event.start?.toLocaleString(undefined, { hour12: false })}\n` +
                `End: ${info.event.end?.toLocaleString(undefined, { hour12: false })}\n` +
                `Duration: ${info.event.extendedProps.duration} min`
            );
        }}
        height="auto"
        />
    </div>
  );
}
