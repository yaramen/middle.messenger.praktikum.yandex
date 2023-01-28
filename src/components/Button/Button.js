import {className, html} from '../../modules/html';
import styles from './Button.css';

function Button({
    label,
    click,
    type = 'primary',
    icon = '',
    attr,
}) {
    const classes = className({
        [styles['button']]: true,
        [styles['button--secondary']]: type === 'secondary',
        [styles['button--link']]: type === 'link',
        [styles['button--action']]: type === 'action',
        [styles['button--icon']]: type === 'icon',
        [styles['button--icon-text']]: icon && label,
    })

    return html`
<button class="${classes}" onclick="${click}" ${attr}>
    ${icon && html`<img class="${styles.icon}" src="${icon}" alt="${label}"/>`}
    ${label}
</button>
`;
}

export {
    Button,
};