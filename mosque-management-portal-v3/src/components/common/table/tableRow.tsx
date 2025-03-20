import React from "react";
import {Button, TableCell, TableRow, Tooltip, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "../alert/alert.tsx";
import {getAgeColor} from "../../../utils/uiUtils.ts";
import {formatDate} from "../../../utils/dateUtils.ts";
import {getAgeFromNRIC, getTruncateAddress} from "../../../utils/dataProcessingUtils.ts";
import {TableColumn, TableRowComponentProps} from "../../../types/props/TableProps.ts";
import {BaseItem} from "../../../types/BaseItem.ts";

const TableRowComponent = <T extends BaseItem, TField extends object>({
    item,
    columns = [],
    optionalColumns = [],
    onOpenModal,
    onAction,
    t,
    actionButtonText,
    showDeleteButton = true,
}: TableRowComponentProps<T, TField>) => {
    const date = item?.date ? formatDate({ date: item.date }) : "N/A";
    const age = typeof item?.nric === "string" ? getAgeFromNRIC(item.nric) : "N/A";
    const ageColor = age !== "N/A" ? getAgeColor(age) : "#d3d3d3";

    const handleRowClick = () => onOpenModal(item);
    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const isConfirmed = await Alert.confirm(
            t("confirmation.delete.title"),
            t("confirmation.delete.text"),
            t
        );
        if (isConfirmed) {
            onAction?.(item.id as string);
        }
    };

    const renderTableCells = (columnsArray: TableColumn<T>[]) => {
        return columnsArray.map((column) => {
            const value = item?.[column.name ?? ''] ?? "N/A";
            return (
                <TableCell key={String(column.name)}>
                    {renderCellContent(column, value)}
                </TableCell>
            );
        });
    };

    const renderCellContent = (
        column: TableColumn<T>,
        value: T[keyof T] | string | number | Date | undefined
    ) => {

        if (value === undefined || value === null) {
            value = column.name === "address" ? "No Address Available" : "N/A";
        }

        if (column.name === "address" && typeof value === "string") {
            value = getTruncateAddress(value);
        }  else if (column.name === "date") {
            value = date;
        } else if (column.name === "age") {
            value = age;
        }

        if (column.truncate && typeof value === "string" && value.length > 30) {
            value = `${value.substring(0, 30)}...`;
        }

        const tooltipValue = typeof value === "string" || typeof value === "number"
            ? value
            : String(value);

        return column.tooltip ? (
            <Tooltip title={tooltipValue}>
                <span>{tooltipValue}</span>
            </Tooltip>
        ) : (
            <Typography>{tooltipValue}</Typography>
        );
    };

    return (
        <TableRow
            key={String(item.id)}
            hover
            role="checkbox"
            tabIndex={-1}
            onClick={handleRowClick}
            sx={{ backgroundColor: "#f9f9f9", borderLeft: `5px solid ${ageColor}` }}
        >
            {renderTableCells([...columns, ...optionalColumns])}

            {showDeleteButton && (
                <TableCell>
                    <Tooltip title={actionButtonText}>
                        <Button variant="contained" color="error" size="small" onClick={handleDelete}>
                            <DeleteIcon />
                        </Button>
                    </Tooltip>
                </TableCell>
            )}
        </TableRow>
    );
};

export default TableRowComponent;
