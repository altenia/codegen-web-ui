export const TYPE_BIGINT = 'BIGINT';

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
