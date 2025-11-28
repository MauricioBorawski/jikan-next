'use client';
import {Dialog, DialogClose, DialogTitle, DialogHeader, DialogContent} from "../ui/dialog";

interface EventDetailsModalProps {
    open: boolean;
    handleOpenChange: (value: boolean) => void;
    calendarEvent: Record<string, unknown>;
}

export const EventDetailsModal = ({open, handleOpenChange, calendarEvent}: EventDetailsModalProps) => {
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogClose asChild/>
                    <DialogTitle>{calendarEvent.title as string}</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}