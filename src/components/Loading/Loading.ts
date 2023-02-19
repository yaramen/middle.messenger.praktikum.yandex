import styles from './Loading.css';
import { createElement } from '../../modules/vdom/createElement';

function Loading() {
    return createElement(
        'div',
        { className: styles.container },
        createElement(
            'div',
            { className: styles.icon },
        ),
    );
}

export {
    Loading,
};
