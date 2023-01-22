import {className, html} from '../../modules/html';
import styles from './Button.css';

function Button({
    label,
    click,
    type = 'button',
}) {
    const classes = className({
        [styles['button']]: true,
        [styles['button--link']]: type === 'link'
    })

    return html`
<button class="${classes}" onclick="${click}">
    ${label}
</button>
`;
}

export {
    Button,
};