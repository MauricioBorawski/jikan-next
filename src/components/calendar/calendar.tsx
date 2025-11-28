'use client'
import {useRef, useState} from "react";
import {createEventCustomButton} from "@/components/calendar/buttons/create";
import {CreateEventModal} from "@/components/modals/create";
import {EventDetailsModal} from "@/components/modals/event-details";

import esLocale from '@fullcalendar/core/locales/es';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

export default function Calendar() {
    const calendarRef = useRef<FullCalendar | null>(null);

    const [openCreateEventModal, setOpenCreateEventModal] = useState(false);
    const [openEventModal, setOpenEventModal] = useState(false);
    const [events, setEvents] = useState([
        {
            id: '1',
            title: "Example event",
            start: Date.now(),
        }
    ]);

    const handleOpenCreateEventModal = (value: boolean) =>
        setOpenCreateEventModal(value);
    const handleOpenEventModal = (open: boolean) => {
        setOpenEventModal(open);
    }

    const createButton = createEventCustomButton(() => setOpenCreateEventModal(true));

    return (
        <>
            <FullCalendar ref={calendarRef} plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
                          height="100%"
                          events={events}
                          eventClick={() => {
                              handleOpenEventModal(true);
                          }}
                          locale={esLocale}
                          initialView={'timeGridWeek'}
                          customButtons={{
                              createButton
                          }}
                          headerToolbar={{
                              left: 'title prev,today,next',
                              right: 'timeGridDay,timeGridWeek,dayGridMonth createButton',
                          }}
                          buttonText={{
                              today: 'Hoy',
                              month: 'Mes',
                              week: 'Semana',
                              day: 'Día',
                          }}
            />
            <CreateEventModal open={openCreateEventModal} handleOpenChange={handleOpenCreateEventModal}
            />
            <EventDetailsModal open={openEventModal} handleOpenChange={handleOpenEventModal} calendarEvent={
                {
                    id: '1',
                    title: "Example event",
                    start: Date.now(),
                }
            }/>
        </>
    )
}