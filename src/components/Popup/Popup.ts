import styles from './Popup.css';
import { createElement, createText } from '../../modules/vdom/createElement';

function Popup({
    title,
    content,
    close,
}) {
    return createElement(
        'div',
        { className: styles.container },
        createElement(
            'div',
            { className: styles.overlay, onclick: close },
        ),
        createElement(
            'div',
            { className: styles.popup },
            createElement(
                'h2',
                { className: styles.title },
                createText(title),
            ),
            createElement(
                'div',
                {},
                content,
            ),
        ),
    );
}

export {
    Popup,
};
