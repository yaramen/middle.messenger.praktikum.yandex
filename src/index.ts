import './index.css';
import { renderDom } from './modules/vdom/render';
import { Pages } from './pages/Pages';
import { createComponent } from './modules/vdom/createElement';

const root = document.querySelector('#root');

if (!root) {
    throw new Error('Error root element not found');
}

const render = () => {
    renderDom(root, createComponent(Pages, { key: 'page' }));
};

render();
