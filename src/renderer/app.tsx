import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import reactModal from 'react-modal';

import Application from './components/Application';

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

Modal.setAppElement(mainElement);

// Render components
const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        mainElement
    );
};

render(Application);
