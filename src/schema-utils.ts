import * as changeCase from 'change-case';

import * as schema from './model/schema';


export function createFieldDef(id: string, name: string, type: string) {
    return {
        id: id,
        name: name,
        type: type,
        typeModif: "",
        isPrimary: false,
        isNullable: false,
        isUnique: false,
        defaultVal: ""
    };
}

let columnMapping: Array<string> = new Array(8);
columnMapping[0] = 'name';
columnMapping[1] = 'type';
columnMapping[2] = 'typeModif';
columnMapping[3] = 'isPrimary';
columnMapping[4] = 'isNullable';
columnMapping[5] = 'isUnique';
columnMapping[6] = 'defaultVal';


let columnParsers: Array<Function> = new Array(8);
columnParsers[0] = function parseName(data: string) {
    return changeCase.snakeCase(data);
}
columnParsers[1] = function parseType(data: string) {
    return data;
}
columnParsers[2] = function parseTypeModif(data: string) {
    return data;
}
columnParsers[3] = function parseBool(data: string) { return (data == 'true') };
columnParsers[4] = columnParsers[5] = columnParsers[3];
columnParsers[6] = (data: string) => data;

export function csvToFields(data: string): Array<schema.FieldDef> {

    if (!data || data.trim().length == 0) {
        return [];
    } 
    let lines = data.split("\n");
    let records : Array<schema.FieldDef> = [];
    for (let line of lines ) {
        let elements = line.split(',');
        let colNum = 0;
        
        let field : any = {};
        for(let element of elements) {
            element = element.trim();
            field[ columnMapping[colNum] ] = columnParsers[colNum](element);
            colNum++
        }
        records.push(field);
    }
    return records;
    /*
    return [
        createFieldDef("1", "id1", "VARCHAR"),
        createFieldDef("2", "id2", "LONG"),
        createFieldDef("2", "id2", "LONG")
    ]*/
}
