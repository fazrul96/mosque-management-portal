import React from "react";
import {InputLabelProps} from "@mui/material";
import {BaseOption} from "../BaseOption.ts";

export interface FormInputProps {
    label: string,
    name: string,
    value?: string | number | Date | undefined;
    onChange?: ((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) | undefined,
    error?: boolean,
    helperText?: string,
    tooltip?: string,
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>,
    type?: "text" | "number" | "select" | "date",
    options?: BaseOption[],
    InputLabelProps?: InputLabelProps,
}