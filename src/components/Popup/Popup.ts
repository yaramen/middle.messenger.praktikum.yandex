import styles from './Popup.css';
import { createElement, createText } from '../../modules/vdom/createElement';
import { VNode } from '../../modules/vdom/types';

interface PopupProps {
    title: string,
    content: VNode,
    close: () => void
}

function Popup({
    title,
    content,
    close,
}: PopupProps) {
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
