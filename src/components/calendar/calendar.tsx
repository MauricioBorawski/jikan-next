'use client'
import {useRef, useState} from "react";
import esLocale from '@fullcalendar/core/locales/es';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import {createEventCustomButton} from "@/components/calendar/buttons/create";
import {CreateEventModal} from "@/components/modals/create";

export default function Calendar() {
    const [openCreateEventModal, setOpenCreateEventModal] = useState(false);
    const calendarRef = useRef<FullCalendar | null>(null);

    const handleOpenCreateEventModal = (value: boolean) =>
        setOpenCreateEventModal(value);

    const createButton = createEventCustomButton(() => setOpenCreateEventModal(true));

    return (
        <>
            <FullCalendar ref={calendarRef} plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
                          height="100%"
                          events={[
                              {
                                  id: '1',
                                  title: "Example event",
                                  start: Date.now(),
                              }
                          ]}
                          eventClick={(info) => {
                              alert(info.event.title);
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
        </>
    )
}