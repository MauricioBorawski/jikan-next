import {supabase} from "@/utils/supabase/supabase";

export async function getAppointments() {
    const {data} = await supabase.from('appointments').select('*');

    return data;
};