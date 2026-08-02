"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddClientModal } from "@/components/modals/AddClientModal.component";

export function AddClientModalTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Agregar</Button>
      <AddClientModal open={open} handleOpenChange={setOpen} />
    </>
  );
}
