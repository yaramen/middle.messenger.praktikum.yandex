import { Sidebar } from '../../components/Sidebar';
import { Chat } from '../../components/Chat';
import styles from './Messenger.css';
import { createComponent, createElement } from '../../modules/vdom/createElement';

function Messenger() {
    return createElement(
        'div',
        { className: styles.container },
        createElement(
            'div',
            { className: styles.sidebar },
            createComponent(
                Sidebar,
                {
                    key: 'sidebar',
                },
            ),
        ),
        createElement(
            'main',
            { className: styles.content },
            createComponent(
                Chat,
                {
                    key: 'chat',
                },
            ),
        ),
    );
}

export {
    Messenger,
};
