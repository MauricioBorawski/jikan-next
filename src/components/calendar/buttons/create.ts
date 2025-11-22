import type {CustomButtonInput} from "@fullcalendar/core";

export const createEventCustomButton: (callback: () => void) => CustomButtonInput = (callback) => ({
    text: "Nuevo Turno",
    hint: "text",
    click: callback,
});