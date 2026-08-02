import { ClientsTable } from "./components/ClientsTable.component";

export default async function AgendaPage() {
  return (
    <div className="p-4 max-h-dvh h-screen">
      <h1>Agenda</h1>
      <ClientsTable />
    </div>
  );
}
