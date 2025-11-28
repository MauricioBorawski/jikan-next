import React from 'react';
import Calendar from "@/components/calendar/calendar";

import {getClients} from "@/utils/supabase/getters/client";
import {getDogs} from "@/utils/supabase/getters/dog";
import {getAppointments} from "@/utils/supabase/getters/appointment";

export default async function Home() {
    const clients = await getClients();
    const dogs = await getDogs();
    const appointments = await getAppointments();

    console.log(dogs, clients, appointments);
    return (
        <div>
            <CalendarContainer>
                <Calendar/>
            </CalendarContainer>
        </div>
    );
}

function CalendarContainer({children}: { children: React.ReactNode }) {
    return (
        <div className="p-4 max-h-dvh h-screen">
            {children}
        </div>
    )
}
