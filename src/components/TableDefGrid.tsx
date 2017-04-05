'use strict';

import * as React from "react";
import * as Redux from "redux";
import{ connect } from "react-redux";

import * as ReactDataGrid from 'react-data-grid';
import { Editors, Formatters } from 'react-data-grid-addons';


import * as schema from '../model/schema';
import * as schemaUtils from '../schema-utils';

import * as actions from '../actions';
import * as context from '../context';

//import javaentitygen from '../codegen/javaentitygen';
import liquibasegen from '../codegen/liquibasegen';

const { DropDownEditor } = Editors;
const { DropDownFormatter } = Formatters;

const DATA_TYPES = [
  { id: 'boolean', value: 'BOOLEAN', text: 'BOOLEAN', title: 'Bug' },
  { id: 'story', value: 'story', text: 'Story', title: 'Story' }
];
const DataTypesEditor = <DropDownEditor options={DATA_TYPES}/>;

const DataTypesFormatter = <DropDownFormatter options={DATA_TYPES} value="boolean"/>;



//export interface TableDefProps { store: context.ReduxStore  }
//interface TableDefProps { store: context.ReduxStore  }
interface TableDefStateProps { 
    schema: context.SchemaStateType; 
}
interface TableDefDispatchProps { 
    onImportCsv: (data: string) => void;
    onAddField: (pos: number) => void;
    onModifyField: (index: number, fieldDef: schema.FieldDef) => void;
}

interface TableDefState {
    columns: Array<AdazzleReactDataGrid.Column>,
    importData: string
}

interface ComponentInputs {
    generatedCode?: HTMLTextAreaElement;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
class TableDefGrid extends React.Component<TableDefStateProps & TableDefDispatchProps, TableDefState> {

    form: ComponentInputs = {};


    constructor() {
        super();

        //this.setState({columns:  [
        this.state = {
            columns:  [
              { key: 'id', name: 'ID', width: 40 },
              { key: 'name', name: 'Name' },
              { key: 'type', name: 'Type', editor: DataTypesEditor, formatter: DataTypesFormatter },
              { key: 'typeModif', name: 'Type Modifier' },
              { key: 'isPrimary', name: 'Primary' },
              { key: 'isNullable', name: 'Nullable' },
              { key: 'isUnique', name: 'Unique' },
              { key: 'defaultVal', name: 'Default value' }
            ],
            // Form input
            importData: ''
        };
        
        // Component doesn't auto bind methods to itself, explicit binding is needed.
        this.rowGetter = this.rowGetter.bind(this);
        this.handleImportDataClick = this.handleImportDataClick.bind(this);
        this.handleImportDataChange = this.handleImportDataChange.bind(this);
        this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
        this.handleGenerateCodeClick = this.handleGenerateCodeClick.bind(this);
    }
    
    rowGetter(i: number) {
        return this.props.schema[i];
    }
    
    handleImportDataClick(event: any) {
        this.props.onImportCsv(this.state.importData);
    }
    
    handleImportDataChange(event: any)  {
        this.setState({importData: event.target.value});
    }
    
    handleGenerateCodeClick(event: any)  {
        this.form.generatedCode.value = liquibasegen(this.props.schema);
    }
    
    handleGridRowsUpdated({ fromRow, toRow, updated }: any) {
        let rows = this.props.schema.slice(); // shallow copy of array
        
        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            for(var key in updated) {
                (rowToUpdate as any)[key] = updated[key];
            }
            this.props.onModifyField(i, rowToUpdate);
            //let updatedRow = React.addons.update(rowToUpdate, {$merge: updated});
            //rows[i] = updatedRow;
        }
        
        //this.setState({ rows });
    }


    render() {
        return  (
            <div>
                <textarea name="importData" value={this.state.importData} 
                    onChange={this.handleImportDataChange} ></textarea>
                <button onClick={ this.handleImportDataClick } >Import</button>
                <ReactDataGrid
                    enableCellSelect={true}
                    columns={this.state.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.props.schema.length}
                    minHeight={200} 
                    onGridRowsUpdated={this.handleGridRowsUpdated} />
                <br />
                <button onClick={ () => this.props.onAddField(0)} >Add</button>
                <button onClick={ this.handleGenerateCodeClick } >Generate</button>
                // TODO: pending
                <textarea name="generatedCode" ref={(input) => { this.form.generatedCode = input; }}
                     ></textarea>
            </div>
        );
    }
}

// redux.js.org/docs/basics/ExampleTodoList.html
function mapStateToProps (state: context.SchemaStateType): TableDefStateProps {
    return {
        schema: state
    };
}

function mapDispatchToProps(dispatch: any): TableDefDispatchProps {
    return {
        onImportCsv: (data: string) => {
            let fields = schemaUtils.csvToFields(data);
            for(let fieldDef of fields) {
                dispatch ( actions.addField(0, fieldDef) );
            }
        },
        onAddField: (pos: number) => {
            let fieldDef: schema.FieldDef = schemaUtils.createFieldDef("1", "id1", "VARCHAR");
            dispatch ( actions.addField(pos, fieldDef) );
        },
        onModifyField: (index: number, fieldDef: schema.FieldDef) => {
            //let fieldDef: schema.FieldDef = schemaUtils.createFieldDef("1", "id1", "VARCHAR");
            dispatch ( actions.modifyField(index, fieldDef) );
        }
        
    };
}

// @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/6237
// For the connect<> usage
export const TableDefGridComponent = connect<TableDefStateProps | TableDefDispatchProps, {}, {}> (
    mapStateToProps,
    mapDispatchToProps
)(TableDefGrid);

