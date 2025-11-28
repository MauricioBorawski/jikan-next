import {supabase} from "../../supabase";

export async function getClients() {
    try {
        const {data} = await supabase.from('clients').select('*');

        return data;
    } catch (error) {
        console.error(error);
    }
}