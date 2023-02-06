import { className } from '../../modules/html';
import styles from './Button.css';
import { createElement, createText } from '../../modules/vdom/createElement';

interface ButtonProps {
    label: string,
    click?: (e: Event) => void,
    type?: 'primary' | 'secondary' | 'link' | 'action' | 'icon',
    icon?: string,
    attr?: Record<string, string>,
}

function Button({
    label,
    click,
    type = 'primary',
    icon = '',
    attr = {},
}: ButtonProps) {
    const classes = className({
        [styles.button]: true,
        [styles['button-secondary']]: type === 'secondary',
        [styles['button-link']]: type === 'link',
        [styles['button-action']]: type === 'action',
        [styles['button-icon']]: type === 'icon',
        [styles['button-icon-text']]: !!(icon && label),
    });

    return createElement(
        'button',
        {
            className: classes,
            onclick: click,
            ...attr,
        },
        !icon ? null : createElement('img', {
            className: styles.icon,
            src: icon,
            alt: label,
        }),
        createText(label),
    );
}

export {
    Button,
};
