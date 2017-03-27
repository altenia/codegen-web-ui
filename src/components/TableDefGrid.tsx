'use strict';

import * as React from "react";
import * as Redux from "redux";
import{ connect } from "react-redux";

import * as ReactDataGrid from 'react-data-grid';
import * as schema from '../model/schema';

import * as actions from '../actions';
import * as context from '../context';

//export interface TableDefProps { store: context.ReduxStore  }
//interface TableDefProps { store: context.ReduxStore  }
interface TableDefStateProps { 
    schema: context.SchemaStateType; 
}
interface TableDefDispatchProps { 
    onAddField: (pos: number) => void; 
}

interface TableDefState {
    columns: Array<AdazzleReactDataGrid.Column>
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
            ]
        };
        
        // Component doesn't auto bind methods to itself, explicit binding is needed.
        this.rowGetter = this.rowGetter.bind(this);
        this.insertEmpty = this.insertEmpty.bind(this);
    }
    
    rowGetter(i: number) {
        return this.props.schema[i];
    }
    
    insertEmpty(e: any)
    {
        e.preventDefault();
        console.log('The link was clicked.');
    }
    
    render() {
        return  (
            <div>
                <ReactDataGrid
                    columns={this.state.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.props.schema.length}
                    minHeight={200} />
                <br />
                <button
                    onClick={ () => this.props.onAddField(0)} >Add</button>
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
            let fieldDef: schema.FieldDef = {
                id: "string",
                name: "test",
                type: "VARCHAR",
                typeModif: "(20)",
                isPrimary: false,
                isNullable: false,
                isUnique: false,
                defaultVal: ""
            };
            dispatch ( actions.addField(pos, fieldDef) );
        }
    };
}

// @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/6237
// For the connect<> usage
export const TableDefGridComponent = connect<TableDefStateProps | TableDefDispatchProps, {}, {}> (
    mapStateToProps,
    mapDispatchToProps
)(TableDefGrid);

