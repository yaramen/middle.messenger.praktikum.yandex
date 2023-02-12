import { className } from '../../modules/html';
import styles from './Popover.css';
import { createElement } from '../../modules/vdom/createElement';
import { VNode } from '../../modules/vdom/types';

interface PopoverProps {
    target: VNode,
    content: VNode,
    type?: 'bottom' | 'top',
    offset?: {
        x: number,
        y: number,
    }
}

function Popover({
    target,
    content,
    type = 'bottom',
    offset = { x: 0, y: 0 },
}: PopoverProps) {
    const [isOpen, setOpen] = this.useState(false);

    const offsetStyle = offset && `margin-left: ${offset.x}px; margin-top: ${offset.y}px`;

    const classes = className({
        [styles.open]: isOpen,
        [styles.popover]: true,
        [styles['popover-top']]: type === 'top',
        [styles['popover-bottom']]: type === 'bottom',
    });

    return createElement(
        'div',
        {
            key: 'popover',
            className: classes,
            onclick: () => {
                setOpen(!isOpen);
            },
        },
        target,
        createElement(
            'div',
            {
                className: styles.content,
                style: offsetStyle,
            },
            content,
        ),
    );
}

export {
    Popover,
};
