import { ClientsTable } from "./components/ClientsTable.component";
import { getDogs } from "@/utils/supabase/getters/dog";
import { getClients } from "@/utils/supabase/getters/client";

export default async function AgendaPage() {
  const initialDogs = (await getDogs()) ?? [];
  const initialOwners = (await getClients()) ?? [];

  return (
    <div className="p-4 max-h-dvh h-screen">
      <h1>Agenda</h1>
      <ClientsTable initialDogs={initialDogs} initialOwners={initialOwners} />
    </div>
  );
}
