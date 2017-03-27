import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'


//import { Hello } from './components/Hello';
import * as context from './context';
import { TableDefGridComponent } from './components/TableDefGrid';

/*
const MyTest = () => (
    <Hello compiler="TypeScript" framework="React"  />
);

const MyApp = () => (
    <TableDefGridComponent />
);
*/

const MyApp = () => (
    <Provider store={context.store}>
        <TableDefGridComponent />
    </Provider>
);

ReactDOM.render(
  <MyApp />,
  document.getElementById('app')
);
