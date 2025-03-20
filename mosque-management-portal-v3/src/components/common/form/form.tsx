import React from 'react';
import {
    FormControl,
    Grid2,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import {FormInputProps} from "../../../types/props/FormProps.ts";
import {EMPTY_STRING} from "../../../constants/AppConstants.ts";

const FormInput: React.FC<FormInputProps> = ({
                                                 label,
                                                 name,
                                                 value,
                                                 onChange,
                                                 error,
                                                 helperText,
                                                 tooltip,
                                                 inputProps = {},
                                                 type = 'text',
                                                 options = [],
                                                 InputLabelProps = {}
                                             }) => {
    const isSelect = type === 'select';

    const renderHelperText = () => {
        if (helperText) {
            return <Typography variant = "body2" color = "error" >{helperText}</Typography >;
        }
        return null;
    };

    const handleSelectChange = (event: SelectChangeEvent<string | number | Date | undefined>) => {
        // @ts-ignore
        onChange?.(event);
    };

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange?.(event);
    };

    const renderSelect = () => (
        <FormControl fullWidth error = {!!error} >
            <InputLabel {...InputLabelProps}>{label}</InputLabel >
            <Select
                name = {name}
                value = {value || EMPTY_STRING}
                onChange = {handleSelectChange}
                inputProps = {inputProps}
                label = {label}
            >
                {options.map((option) => (
                    <MenuItem key = {option.value} value = {option.value} >
                        {option.label}
                    </MenuItem >
                ))}
            </Select >
            {renderHelperText()}
        </FormControl >
    );

    const renderTextField = () => (
        <TextField
            fullWidth
            label = {label}
            variant = "outlined"
            name = {name}
            value = {value || EMPTY_STRING}
            onChange = {handleTextFieldChange}
            error = {!!error}
            helperText = {helperText || EMPTY_STRING}
            type = {type}
            slotProps = {{
                htmlInput: inputProps,
                inputLabel: InputLabelProps,
            }}
        />
    );

    const renderInput = isSelect ? renderSelect : renderTextField;

    return (
        <Grid2 size = {{xs: 12, sm: 12, md: 12}} >
            {tooltip ? (
                <Tooltip title = {tooltip || ''} arrow enterDelay = {500} leaveDelay = {200} >
                    <div >{renderInput()}</div >
                </Tooltip >
            ) : (
                renderInput()
            )}
        </Grid2 >
    );
};

export default FormInput;
