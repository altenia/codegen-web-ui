import * as schema from './model/schema';
//import FieldDef from './model/schema'

interface ImportCsvAction {
  type: 'IMPORT_CSV';
  data: string;
}

interface AddFieldAction {
  type: 'ADD_FIELD';
  position: number;
  fieldDef: schema.FieldDef;
}

interface ModifyFieldAction {
  type: 'MODIFY_FIELD';
  index: number;
  fieldDef: schema.FieldDef;
}

export type Action = ImportCsvAction | AddFieldAction | ModifyFieldAction

export const importCvs = (data: string): Action => ({
  type: 'IMPORT_CSV',
  data: data
});

export const addField = (position: number, fieldDef: schema.FieldDef): Action => ({
  type: 'ADD_FIELD',
  position: position,
  fieldDef: fieldDef
});

export const modifyField = (index: number, fieldDef: schema.FieldDef): Action => ({
  type: 'MODIFY_FIELD',
  index: index,
  fieldDef: fieldDef
});
