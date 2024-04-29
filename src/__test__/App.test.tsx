import { render } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

test('Renders the webpage', () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );

});

