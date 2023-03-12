import styles from './ProfileLayout.css';
import { Button } from '../../components/Button';
import backIcon from '../../icons/back.svg';
import { getLinkPage } from '../../modules/router';
import { goToHistory as goTo } from '../../modules/storeRouter';
import { createComponent, createElement } from '../../modules/vdom/createElement';
import { VNode } from '../../modules/vdom/types';

function ProfileLayout({ content }: { content: VNode, key: string }) {
    return createElement(
        'div',
        {
            key: 'layout',
            className: styles.container,
        },
        createElement(
            'div',
            { key: 'button', className: styles.panel },
            createComponent(
                Button,
                {
                    key: 'button',
                    icon: backIcon,
                    style: 'secondary',
                    click: () => goTo(getLinkPage('messenger')),
                },
            ),
        ),
        createElement(
            'main',
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
