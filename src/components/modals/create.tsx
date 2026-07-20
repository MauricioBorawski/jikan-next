"use client";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "../ui/dialog";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { createAppointment } from "@/utils/supabase/setters/appointment";

interface CreateEventModalProps {
  open: boolean;
  handleOpenChange: (value: boolean) => void;
}

export function CreateEventModal(props: CreateEventModalProps) {
  const [date, setDate] = useState(new Date());
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <Dialog open={props.open} onOpenChange={props.handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogClose asChild />
          <DialogTitle>Nuevo Turno</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const title = formData.get("name") as string;
            const time = formData.get("time") as string;
            const dateValue = formData.get("date") as string;

            const datetime = new Date(`${dateValue}T${time}:00`).toISOString();

            console.debug(formData);

            createAppointment({
              title,
              service: formData.get("service") as string,
              client_id: 1,
              dog_id: 1,
              datetime,
            });
          }}
        >
          <FieldSet>
            <Field>
              <FieldLabel htmlFor="name">Nombre</FieldLabel>
              <Input id="name" />
            </Field>
            <Field>
              <FieldLabel htmlFor="service">Servicio</FieldLabel>
              <Input id="service" />
            </Field>
            <Field>
              <FieldLabel htmlFor="date">Dia</FieldLabel>
              <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-48 justify-between font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Elegir una fecha"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    required={true}
                    mode="single"
                    selected={date}
                    today={new Date()}
                    onSelect={(date) => {
                      setDate(date);
                      setOpenPopover(false);
                    }}
                    className="rounded-lg border"
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Field>
              <FieldLabel id="time">Hora</FieldLabel>
              <Input type="time" id="time" />
            </Field>
            <Field orientation="horizontal">
              <Button
                variant="outline"
                type="button"
                onClick={() => props.handleOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Crear</Button>
            </Field>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}
