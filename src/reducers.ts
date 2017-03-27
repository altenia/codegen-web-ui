import * as schema from './model/schema';
import * as actions from './actions';  

export default function mainReducer(
    state: Array<schema.FieldDef> = [],
    action: actions.Action
): Array<schema.FieldDef> {
    switch (action.type) {
        case "IMPORT_CSV":
            //return [...state, { text: action.text, done: false }];
            return state;
            
        case "ADD_FIELD":
            // Clone
            var fieldDef : any = (<any>Object).assign({}, action.fieldDef);
            return [...state, fieldDef];

        case "MODIFY_FIELD":
            return state.map((fieldDef, index) => {
                if (index !== action.index) {
                    return fieldDef;
                }
                var fieldDef : schema.FieldDef = (<any>Object).assign({}, action.fieldDef);
                return fieldDef;
            });

        default:
            return state;
    }
}
