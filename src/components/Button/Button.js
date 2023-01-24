import {className, html} from '../../modules/html';
import styles from './Button.css';

function Button({
    label,
    click,
    type = 'button',
    icon = '',
}) {
    const classes = className({
        [styles['button']]: true,
        [styles['button--link']]: type === 'link',
        [styles['button--action']]: type === 'action',
        [styles['button--icon']]: type === 'icon',
        [styles['button--icon-text']]: icon && label,
    })

    return html`
<button class="${classes}" onclick="${click}">
    ${icon && html`<img class="${styles.icon}" src="${icon}" alt="${label}"/>`}
    ${label}
</button>
`;
}

export {
    Button,
};