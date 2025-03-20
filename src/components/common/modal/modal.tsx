import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid2} from "@mui/material";
import FormInput from "../../common/form/form.tsx";
import {DonationsField, LogisticsField} from "../../../types/BaseField.ts";
import {GeneralModalProps} from "../../../types/props/GeneralModalProps.ts";
import {EMPTY_STRING} from "../../../constants/AppConstants.ts";
import {BaseItem} from "../../../types/BaseItem.ts";

const isDonationsField = (field: DonationsField | LogisticsField): field is DonationsField => {
    return (field as DonationsField).isRequired !== undefined;
};

const GeneralModal = <T extends BaseItem>({
    open,
    onClose,
    selectedItem,
    onInputChange,
    onSave,
    fieldConfig,
    errors,
    t,
    module,
    mode,
}: GeneralModalProps<T>) => {
    const isEditing = selectedItem !== null;
    const renderField = (field: DonationsField | LogisticsField) => {
        const { name, type, label, options } = field;
        const inputLabelProps = isDonationsField(field) && field.isDate ? { shrink: true } : {};

        return (
            <Grid2 size = {{xs: 12, sm: 12, md: 12}} key = {name} >
                <FormInput
                    label = {label}
                    name = {name}
                    value = {selectedItem?.[name as keyof T] || EMPTY_STRING}
                    onChange = {onInputChange}
                    error = {!!errors[name]}
                    helperText = {errors[name]}
                    tooltip = {t(`dialog.${module}.tooltip.${name}`)}
                    type = {type}
                    options = {options}
                    InputLabelProps = {inputLabelProps}
                />
            </Grid2 >
        );
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {isEditing && mode === "edit"
                    ? `${t("buttons.edit")} ${t(`dialog.${module}.title`)}`
                    : `${t("buttons.add")} ${t(`dialog.${module}.title`)}`}
            </DialogTitle>
            <Divider sx={{ marginBottom: "5px" }} />
            <DialogContent>
                <Grid2 container spacing={2}>
                    {fieldConfig?.map((field) => renderField(field))}
                </Grid2>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => onSave?.(selectedItem?.id, selectedItem as T)}
                    variant="contained"
                >
                    {isEditing && mode === "edit" ? t("buttons.update") : t("buttons.save")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GeneralModal;