"use client";

import { useEffect, useMemo, useState } from "react";
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
import { createClient } from "@/utils/supabase/client";

interface ClientsTableProps {
  initialDogs: Dog[];
  initialOwners: Client[];
}

export function ClientsTable({ initialDogs, initialOwners }: ClientsTableProps) {
  const [dogs, setDogs] = useState<Dog[]>(initialDogs);
  const [owners, setOwners] = useState<Client[]>(initialOwners);

  useEffect(() => {
    const supabase = createClient();

    const fetchData = async () => {
      const [{ data: dogsData }, { data: ownersData }] = await Promise.all([
        supabase.from("dogs").select("*").order("created_at", { ascending: false }),
        supabase.from("clients").select("*").order("created_at", { ascending: false }),
      ]);

      setDogs((dogsData as Dog[]) ?? []);
      setOwners((ownersData as Client[]) ?? []);
    };

    void fetchData();

    const dogsChannel = supabase
      .channel("dogs_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "dogs" },
        () => {
          void fetchData();
        }
      )
      .subscribe();

    const clientsChannel = supabase
      .channel("clients_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "clients" },
        () => {
          void fetchData();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(dogsChannel);
      void supabase.removeChannel(clientsChannel);
    };
  }, []);

  const ownersById = useMemo(
    () => new Map(owners.map((owner) => [owner.id, owner])),
    [owners]
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-4">
        <form>
          <Input placeholder="Buscar" />
        </form>
        <AddClientModalTrigger
          onCreate={(newDog, newOwner) => {
            setDogs((currentDogs) => [newDog, ...currentDogs]);
            setOwners((currentOwners) => {
              if (currentOwners.some((owner) => owner.id === newOwner.id)) {
                return currentOwners;
              }

              return [newOwner, ...currentOwners];
            });
          }}
        />
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
                {ownersById.get(dog.owner_id)?.name ?? "—"}
              </TableCell>
              <TableCell>
                {ownersById.get(dog.owner_id)?.contact ?? "—"}
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
