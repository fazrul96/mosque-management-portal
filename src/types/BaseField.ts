import {FieldType} from "./BaseItem.ts";
import {BaseOption} from "./BaseOption.ts";

export interface BaseField {
    name: string;
    type: FieldType;
    label: string;
    isRequired?: boolean;
    inputProps?: Record<string, unknown>;
    options?: BaseOption[];
}

export interface DonationsField extends BaseField {
    isDate?: boolean;
}

export type LogisticsField = BaseField
