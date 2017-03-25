import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from './components/Hello';
import { TableDefGrid } from './components/TableDefGrid';


const MyTest = () => (
    <Hello compiler="TypeScript" framework="React"  />
);

const MyApp = () => (
    <TableDefGrid  />
);

ReactDOM.render(
  <MyApp />,
  document.getElementById('app')
);
