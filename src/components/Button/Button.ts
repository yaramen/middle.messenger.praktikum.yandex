import { className } from '../../modules/html';
import styles from './Button.css';
import { createElement, createText } from '../../modules/vdom/createElement';

interface ButtonProps {
    label?: string,
    click?: (e: Event) => void,
    style?: 'primary' | 'secondary' | 'link' | 'action' | 'icon',
    type?: 'button' | 'reset' | 'submit';
    icon?: string,
    attr?: Record<string, string>,
}

function Button({
    label = '',
    click = () => {},
    style = 'primary',
    type = 'button',
    icon = '',
    attr = {},
}: ButtonProps) {
    const classes = className({
        [styles.button]: true,
        [styles['button-secondary']]: style === 'secondary',
        [styles['button-link']]: style === 'link',
        [styles['button-action']]: style === 'action',
        [styles['button-icon']]: style === 'icon',
        [styles['button-icon-text']]: !!(icon && label),
    });

    return createElement(
        'button',
        {
            className: classes,
            onclick: click,
            type,
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
    ButtonProps,
};
