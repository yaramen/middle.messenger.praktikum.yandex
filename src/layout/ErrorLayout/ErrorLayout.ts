import { Button } from '../../components/Button';
import { getLinkPage } from '../../modules/router';
import { goToHistory as goTo } from '../../modules/storeRouter';
import styles from './ErrorLayout.css';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';

interface ErrorLayoutProps {
    code: number,
    title: string,
}

function ErrorLayout({
    code,
    title,
}: ErrorLayoutProps) {
    return createElement(
        'main',
        { className: styles.main },
        createElement(
            'div',
            { className: styles.container },
            createElement(
                'h2',
                {},
                createText(code.toString()),
            ),
            createElement(
                'h1',
                {},
                createText(title),
            ),
            createComponent(
                Button,
                {
                    key: 'button',
                    label: 'На главную',
                    style: 'secondary',
                    click: () => goTo(getLinkPage('auth')),
                },
            ),
        ),
    );
}

export {
    ErrorLayout,
};
