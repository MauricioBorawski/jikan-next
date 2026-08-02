"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";

import { createClient } from "@/utils/supabase/client";
import type { Dog } from "@/types/Dog/type";
import type { Client } from "@/types/Client/type";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface AddClientModalProps {
  open: boolean;
  handleOpenChange: (value: boolean) => void;
  onCreate: (dog: Dog, owner: Client) => void;
}

export function AddClientModal(props: AddClientModalProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      ownerName: "",
      dogName: "",
      contact: "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const supabase = createClient();

        const { data: clientData, error: clientError } = await supabase
          .from("clients")
          .insert({
            name: value.ownerName.trim(),
            contact: value.contact.trim() || null,
            created_at: new Date().toISOString(),
          })
          .select("id")
          .single();

        if (clientError) {
          throw clientError;
        }

        if (!clientData?.id) {
          throw new Error("No se pudo crear el contacto");
        }

        const optimisticOwner: Client = {
          id: clientData.id,
          name: value.ownerName.trim(),
          contact: value.contact.trim() || null,
          created_at: new Date().toISOString(),
          email: null,
        };

        const optimisticDog: Dog = {
          id: Date.now(),
          name: value.dogName.trim(),
          owner_id: clientData.id,
          created_at: new Date().toISOString(),
          age: null,
          breed: null,
        };

        props.onCreate(optimisticDog, optimisticOwner);

        const { error: dogError } = await supabase.from("dogs").insert({
          name: value.dogName.trim(),
          owner_id: clientData.id,
          created_at: new Date().toISOString(),
        });

        if (dogError) {
          throw dogError;
        }

        form.reset();
        props.handleOpenChange(false);
        router.refresh();
      } catch (error) {
        setSubmitError(
          error instanceof Error ? error.message : "No se pudo guardar el contacto"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={props.open} onOpenChange={props.handleOpenChange}>
      <DialogContent>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle>Agregar Contacto</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <form.Field
              name="ownerName"
              validators={{
                onChange: ({ value }) =>
                  value.trim().length > 0 ? undefined : "El nombre del dueño es requerido",
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="owner-name">Dueño</Label>
                  <Input
                    id="owner-name"
                    name="ownerName"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Juan Pérez"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="dogName"
              validators={{
                onChange: ({ value }) =>
                  value.trim().length > 0 ? undefined : "El nombre del perro es requerido",
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="dog-name">Nombre del perro</Label>
                  <Input
                    id="dog-name"
                    name="dogName"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Max"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="contact">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="contact">Contacto</Label>
                  <Input
                    id="contact"
                    name="contact"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="+54 9 11 1234 5678"
                  />
                </div>
              )}
            </form.Field>
          </div>

          {submitError && <p className="text-sm text-destructive">{submitError}</p>}

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Agregar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
