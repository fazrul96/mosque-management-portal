import {BaseItem, FieldType} from "../BaseItem.ts";
import React from "react";

export type Item<T = BaseItem> = T extends BaseItem ? T : never;

export interface BaseTableColumn<T extends object> {
    name?: keyof T;
    label?: string;
}

export interface TableColumn<T extends object, TField extends object = T> extends BaseTableColumn<T> {
    fieldType?: FieldType;
    format?: (value: T[keyof T]) => unknown;
    tooltip?: boolean;
    truncate?: boolean;
    optionalColumns?: TableColumn<T, TField>[];
}

export interface TableCommonProps<TField extends BaseTableColumn<T>, T extends object> {
    columns: TableColumn<T, TField>[];
    optionalColumns?: TableColumn<T, TField>[];
    t: (key: string) => string;
    onSort: (columnName: string) => void;
    onAction?: (id: string) => void;
    actionButtonText?: string;
    showDeleteButton?: boolean;
}

export type TableProps<TField extends BaseTableColumn<T>, T extends object> = TableCommonProps<TField, T>

export type TableHeaderProps<TField extends BaseTableColumn<T>, T extends object> = TableCommonProps<TField, T>

export interface TableRowComponentProps<T extends BaseItem, TField extends object> extends TableProps<TField, T> {
    item: T;
    onOpenModal: (item: BaseItem) => void;
}

export interface GeneralTableProps<T extends BaseItem, TField extends object> extends TableProps<TField, T> {
    data: T[];
    searchQuery: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onOpenModal: (item: BaseItem) => void;
    actionButtonText: string;
    loading?: boolean;
    isLoading?: boolean;
    handleGeneratePDF?: (data: T[]) => void;
    users?: T[];
}

