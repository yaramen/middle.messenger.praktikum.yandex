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
        [styles['button--icon']]: type === 'icon',
    })

    return html`
<button class="${classes}" onclick="${click}">
    ${icon && html`<img src="${icon}" alt="${label}"/>`}
    ${label}
</button>
`;
}

export {
    Button,
};