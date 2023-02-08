import styles from './ProfileLayout.css';
import { Button } from '../../components/Button';
import backIcon from '../../icons/back.svg';
import { getLinkPage, goTo } from '../../modules/router';
import { createComponent, createElement } from '../../modules/vdom/createElement';
import { VNode } from '../../modules/vdom/types';

function ProfileLayout({ content }: { content: VNode }) {
    return createElement(
        'div',
        {
            key: 'layout',
            className: styles.container,
        },
        createElement(
            'div',
            { className: styles.panel },
            createComponent(
                Button,
                {
                    key: 'button',
                    icon: backIcon,
                    type: 'secondary',
                    click: () => goTo(getLinkPage('messenger')),
                },
            ),
        ),
        createElement(
            'div',
            { className: styles.content },
            createElement(
                'div',
                { className: styles.wrapper },
                content,
            ),
        ),
    );
}

export {
    ProfileLayout,
};
