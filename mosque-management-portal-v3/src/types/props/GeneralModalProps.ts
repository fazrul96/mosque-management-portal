import React from "react";
import {DonationsField, LogisticsField} from "../BaseField.ts";
import {BaseItem} from "../BaseItem.ts";

export interface GeneralModalProps<T extends BaseItem> {
    open: boolean;
    onClose: () => void;
    selectedItem?: Partial<T> | null;
    onInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    errors: { [key: string]: string | undefined };
    t: (key: string) => string;
    module: string;
    mode?: "add" | "edit" | undefined;
    onSave?: (id: string | undefined, updatedItem: T) => void;
    fieldConfig?: (DonationsField | LogisticsField)[];
}