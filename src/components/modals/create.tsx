'use client';
import {useState} from "react";
import {Dialog, DialogClose, DialogTitle, DialogHeader, DialogContent} from "../ui/dialog";
import {Field, FieldLabel, FieldSet} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Calendar} from "@/components/ui/calendar";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ChevronDownIcon} from "lucide-react";

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
                    <DialogClose asChild/>
                    <DialogTitle>Nuevo Turno</DialogTitle>
                </DialogHeader>
                <form>
                    <FieldSet>
                        <Field>
                            <FieldLabel htmlFor='name'>Nombre</FieldLabel>
                            <Input id="name"/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor='date'>Dia</FieldLabel>
                            <Popover open={openPopover} onOpenChange={setOpenPopover}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="w-48 justify-between font-normal"
                                    >
                                        {date ? date.toLocaleDateString() : "Elegir una fecha"}
                                        <ChevronDownIcon/>
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
                            <Input type='time' id="time"/>
                        </Field>
                        <Field orientation="horizontal">
                            <Button variant='outline' type="button">Cancelar</Button>
                            <Button type="submit">Crear</Button>
                        </Field>
                    </FieldSet>
                </form>
            </DialogContent>
        </Dialog>
    )
}