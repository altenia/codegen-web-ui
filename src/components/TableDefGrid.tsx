'use strict';

import * as React from "react";
import * as ReactDataGrid from 'react-data-grid';

export interface TableDefProps {  }

interface TableDefState {
    columns: Array<AdazzleReactDataGrid.Column>,
    rows: Array<Object>
}


// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class TableDefGrid extends React.Component<TableDefProps, TableDefState> {
    

    constructor() {
        super();

        //this.setState({columns:  [
        this.state = {columns:  [
          { key: 'id', name: 'ID' },
          { key: 'name', name: 'Name' },
          { key: 'type', name: 'Type' },
          { key: 'typeModif', name: 'Type Modifier' },
          { key: 'isPrimary', name: 'Primary' },
          { key: 'isNullable', name: 'Nullable' },
          { key: 'isUnique', name: 'Unique' },
          { key: 'defaultVal', name: 'Default value' }
          ],
          rows: [
            {
                id: "1",
                name: "id",
                type: "BIGINT",
                typeModif: null,
                isPrimary: true,
                isNullable: false,
                isUnique: null,
                defaultVal: null
            }
            ]
            };
        
        // Component doesn't auto bind methods to itself, explicit binding is needed.
        this.rowGetter = this.rowGetter.bind(this);

    }
    
    rowGetter(i: number) {
        return this.state.rows[i];
    }
    
    render() {
        return  (
          <ReactDataGrid
            columns={this.state.columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.rows.length}
            minHeight={200} />
        );
    }
}