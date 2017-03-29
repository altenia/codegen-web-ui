//import Immutable = require('immutable')

//import { createStore, store as ReduxStore } from 'redux'
import * as Redux from 'redux';


//import FieldDef from './model/schema'
import * as schema from './model/schema';
import mainReducer from './reducers';

export type SchemaStateType = Array<schema.FieldDef>;

const initialState : SchemaStateType = [];

export type ReduxStore = Redux.Store<SchemaStateType>;

export const store : ReduxStore = Redux.createStore(
    mainReducer, initialState,
    (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__()
    );



// https://rjzaworski.com/2016/08/getting-started-with-redux-and-typescript