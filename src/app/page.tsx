import Calendar from "@/components/calendar/calendar";

export default function Home() {
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
