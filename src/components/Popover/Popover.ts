import { className, html } from '../../modules/html';
import styles from './Popover.css';

function Popover({
    target,
    content,
    type = 'bottom',
    offset,
}) {
    const click = (element: HTMLElement) => {
        element.classList.toggle(styles.open);
    };

    const offsetStyle = offset && `margin-left: ${offset.x}px; margin-top: ${offset.y}px`;

    const classes = className({
        [styles.popover]: true,
        [styles['popover-top']]: type === 'top',
        [styles['popover-bottom']]: type === 'bottom',
    });

    return html`
<div class="${classes}" onclick="${click}">
    ${target}
    <div class="${styles.content}" style="${offsetStyle}">${content}</div>
</div>
`;
}

export {
    Popover,
};
