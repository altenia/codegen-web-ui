import * as schema from '../model/schema';

let typeMappting: any = {};
typeMappting[schema.TYPE_BIGINT] = 'Long';
typeMappting[schema.TYPE_BOOLEAN] = 'Boolean';
typeMappting[schema.TYPE_DATE] = 'LocalDate';
typeMappting[schema.TYPE_DATETIME] = 'LocalDate';
typeMappting[schema.TYPE_INTEGER] = 'Integer';
typeMappting[schema.TYPE_LONG] = 'Long';
typeMappting[schema.TYPE_SHORT] = 'Short';
typeMappting[schema.TYPE_VARCHAR] = 'String';

export default function generate(entityDef: Array<schema.FieldDef>) : string
{
    let output: string = '<createTable tableName="YOUR-TABLE">';
    for(let fieldDef of entityDef)
    {
        // <column name="dtype" type="VARCHAR(255)"/>
        // fieldDef.type fieldDef.name;
        output += "<column name=\"" + fieldDef.name + "\" type=\""+ fieldDef.type + "\"/>\n";
    }
    output += '</createTable>';
    
    return output;
}