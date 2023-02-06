import styles from './PopupFormLayout.css';
import { createElement } from '../../modules/vdom/createElement';

function PopupFormLayout() {
    return createElement('div', {
        className: styles.container,
    });
}

export {
    PopupFormLayout,
};
