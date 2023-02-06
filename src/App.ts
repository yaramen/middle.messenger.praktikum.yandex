import { html } from './modules/html';
import { Pages } from './pages/Pages';
import { createComponent } from './modules/vdom/createElement';

function App() {
    return createComponent(
        Pages,
        {
            key: 'pages',
        },
    );
}

export {
    App,
};
