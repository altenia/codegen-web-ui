'use strict';

import * as React from "react";
import * as Redux from "redux";
import{ connect } from "react-redux";

import * as ReactDataGrid from 'react-data-grid';

import * as schema from '../model/schema';
import * as schemaUtils from '../schema-utils';

import * as actions from '../actions';
import * as context from '../context';

//export interface TableDefProps { store: context.ReduxStore  }
//interface TableDefProps { store: context.ReduxStore  }
interface TableDefStateProps { 
    schema: context.SchemaStateType; 
}
interface TableDefDispatchProps { 
    onImportCsv: (data: string) => void;
    onAddField: (pos: number) => void;
}

interface TableDefState {
    columns: Array<AdazzleReactDataGrid.Column>,
    importData: string
}


// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
class TableDefGrid extends React.Component<TableDefStateProps & TableDefDispatchProps, TableDefState> {

    constructor() {
        super();

        //this.setState({columns:  [
        this.state = {
            columns:  [
              { key: 'id', name: 'ID' },
              { key: 'name', name: 'Name' },
              { key: 'type', name: 'Type' },
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
    }
    
    rowGetter(i: number) {
        return this.props.schema[i];
    }
    
    handleImportDataClick(event: any) {
        this.props.onImportCsv(this.state.importData);
    }
    
    handleImportDataChange(event: any) {
        this.setState({importData: event.target.value});
    }

    render() {
        return  (
            <div>
                <textarea name="importData" value={this.state.importData}
 onChange={this.handleImportDataChange} ></textarea>
                <button onClick={ this.handleImportDataClick } >Import</button>
                <ReactDataGrid
                    columns={this.state.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.props.schema.length}
                    minHeight={200} />
                <br />
                <button onClick={ () => this.props.onAddField(0)} >Add</button>
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
        onAddField: (pos: number) => {
            let fieldDef: schema.FieldDef = schemaUtils.createFieldDef("1", "id1", "VARCHAR");
            dispatch ( actions.addField(pos, fieldDef) );
        },
        onImportCsv: (data: string) => {
            let fields = schemaUtils.csvToFields(data);
            for(let fieldDef of fields) {
                dispatch ( actions.addField(0, fieldDef) );
            }
        }
        
    };
}

// @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/6237
// For the connect<> usage
export const TableDefGridComponent = connect<TableDefStateProps | TableDefDispatchProps, {}, {}> (
    mapStateToProps,
    mapDispatchToProps
)(TableDefGrid);

