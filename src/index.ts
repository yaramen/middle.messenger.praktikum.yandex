import { App } from './App';
import './index.css';
import { store } from './modules/store';
import { renderDom } from './modules/vdom/render';
import { Auth } from './pages/Auth';

const root = document.querySelector('#root');

if (!root) {
    throw new Error('Error root element not found');
}

const render = () => {
    renderDom(root, Auth());
};

render();
