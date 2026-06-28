import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Calendar from "@/components/calendar/calendar";

export default async function Home() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const {data} = await supabase.from('dogs').select('*');

    console.log(data);
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
