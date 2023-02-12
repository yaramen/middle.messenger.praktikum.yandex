import styles from './PopupFormLayout.css';
import { createElement } from '../../modules/vdom/createElement';

function PopupFormLayout() {
    return createElement('main', {
        className: styles.container,
    });
}

export {
    PopupFormLayout,
};
