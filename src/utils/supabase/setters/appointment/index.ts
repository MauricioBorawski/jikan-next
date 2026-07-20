import { supabase } from "@/utils/supabase/supabase";
import { AppointmentWithoutId } from "@/types/Appointment/types";

export async function createAppointment(appointment: AppointmentWithoutId) {
  try {
    const { error } = await supabase.from("appointments").insert(appointment);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error creating appointment:", error);
  }
}
