import { html } from '../../modules/html';
import styles from './PopupFormLayout.css';

function PopupFormLayout({ children }) {
    return html`
<div class="${styles.container}">
    ${children}
</div> 
`;
}

export {
    PopupFormLayout,
};
