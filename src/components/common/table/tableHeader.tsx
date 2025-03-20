import {TableCell, TableRow} from "@mui/material";
import {BaseTableColumn, TableColumn, TableHeaderProps} from "../../../types/props/TableProps.ts";

const ACTION_COLUMN_NAME = 'action';

const TableHeader = <TField extends BaseTableColumn<T>, T extends object>({
    columns = [],
    optionalColumns = [],
    onSort,
    showDeleteButton = true,
    t,
}: TableHeaderProps<TField, T>) => {
        const renderTableHeaderCells = (columnsArray: TableColumn<TField>[]) => {
        return columnsArray.map((column) => (
            <TableCell
                key={String(column.name)}
                onClick={() => column.name !== ACTION_COLUMN_NAME && onSort(String(column.name))}
                sx={{ backgroundColor: "#b3f6a9" }}
            >
                {column.label || String(column.name)}
            </TableCell>
        ));
    };

    return (
        <thead>
            <TableRow>
                {renderTableHeaderCells([...columns, ...optionalColumns] as unknown as TableColumn<TField, TField>[])}
                {showDeleteButton && (
                    <TableCell sx={{ backgroundColor: "#b3f6a9" }}>
                        {t("tableHeaders.action")}
                    </TableCell>
                )}
            </TableRow>
        </thead>
    );
};

export default TableHeader;
