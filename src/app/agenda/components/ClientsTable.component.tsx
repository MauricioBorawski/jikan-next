import { getDogs } from "@/utils/supabase/getters/dog";
import { getClients } from "@/utils/supabase/getters/client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { AddClientModalTrigger } from "@/components/modals/AddClientModalTrigger";

import type { Dog } from "@/types/Dog/type";
import type { Client } from "@/types/Client/type";

export async function ClientsTable() {
  const dogs = (await getDogs()) as Dog[] | null;
  const owners = (await getClients()) as Client[] | null;

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-4">
        <form>
          <Input placeholder="Buscar" />
        </form>
        <AddClientModalTrigger />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Perro</TableHead>
            <TableHead>Dueño</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(dogs ?? []).map((dog) => (
            <TableRow key={dog.id}>
              <TableCell>{dog.name}</TableCell>
              <TableCell>
                {owners?.find((owner) => owner.id === dog.owner_id)?.name ??
                  "—"}
              </TableCell>
              <TableCell>
                {owners?.find((owner) => owner.id === dog.owner_id)?.contact ??
                  "—"}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Ver turnos</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
