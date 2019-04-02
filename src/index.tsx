import * as React from 'react';
import { Provider } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import * as ReactDOM from 'react-dom';
import { DragDropContextProvider } from 'react-dnd';

import 'typeface-roboto';

import createStore from './redux';
import registerServiceWorker from './registerServiceWorker';

import App from './pages/App/App';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <DragDropContextProvider backend={HTML5Backend}>
      <App />
    </DragDropContextProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
