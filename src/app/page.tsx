import Calendar from "@/components/calendar/calendar";

import { getAppointments } from "@/utils/supabase/getters/appointment";

function parseAppointmentsToEvents(
  appointments: Awaited<ReturnType<typeof getAppointments>>,
) {
  if (!appointments) return [];

  return appointments.map((appointment) => ({
    id: appointment.id.toString(),
    title: appointment.service || "Cita",
    start: new Date(appointment.datetime).getTime(),
  }));
}

export default async function Home() {
  const appointments = await getAppointments();
  const events = parseAppointmentsToEvents(appointments);
  console.log("events", events);

  return (
    <div>
      <CalendarContainer>
        <Calendar events={events} />
      </CalendarContainer>
    </div>
  );
}

function CalendarContainer({ children }: { children: React.ReactNode }) {
  return <div className="p-4 max-h-dvh h-screen">{children}</div>;
}
