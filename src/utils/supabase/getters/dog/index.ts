import {supabase} from "@/utils/supabase/supabase";

export async function getDogs() {
    const {data} = await supabase.from('dogs').select('*');

    return data;
}