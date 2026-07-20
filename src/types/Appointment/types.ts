export interface Appointment {
    client_id: number
    created_at: string
    datetime: string
    dog_id: number
    id: number
    service: string | null
    title: string;
}

export type AppointmentWithoutId = Omit<Appointment, "id" | "created_at">;