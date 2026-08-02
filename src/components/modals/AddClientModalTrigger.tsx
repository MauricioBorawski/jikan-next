"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddClientModal } from "@/components/modals/AddClientModal.component";

import type { Dog } from "@/types/Dog/type";
import type { Client } from "@/types/Client/type";

interface AddClientModalTriggerProps {
  onCreate: (dog: Dog, owner: Client) => void;
}

export function AddClientModalTrigger({ onCreate }: AddClientModalTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Agregar</Button>
      <AddClientModal open={open} handleOpenChange={setOpen} onCreate={onCreate} />
    </>
  );
}
