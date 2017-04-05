export const TYPE_BIGINT = 'BIGINT';
export const TYPE_BOOLEAN = 'BOOLEAN';
export const TYPE_DATE = 'DATE';
export const TYPE_DATETIME = 'DATETIME';
export const TYPE_INTEGER = 'INTEGER';
export const TYPE_LONG = 'LONG';
export const TYPE_SHORT = 'SHORT';
export const TYPE_VARCHAR = 'VARCHAR';

export interface FieldDef {
    id: string;
    name: string;
    type: string,
    typeModif: string;
    isPrimary: boolean;
    isNullable: boolean;
    isUnique: boolean;
    defaultVal: string;
};
