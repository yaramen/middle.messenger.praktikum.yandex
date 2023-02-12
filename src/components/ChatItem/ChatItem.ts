import { Avatar } from '../Avatar';
import styles from './ChatItem.css';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';
import { Contact } from '../../types/model';

function ChatItem({
    id,
    name,
    time,
    unread,
    avatar,
}: Contact) {
    function click(messageId: number) {
        store.dispatch(actions.chatChange(messageId));
    }

    return createElement(
        'div',
        {
            className: styles.item,
            onclick: () => click(id),
        },
        createElement(
            'div',
            { className: styles.avatar },
            createComponent(Avatar, {
                key: 'avatar',
                image: avatar,
                name,
            }),
        ),
        createElement(
            'div',
            { className: styles.content },
            createElement(
                'div',
                { className: styles.group },
                createElement(
                    'div',
                    {},
                    createText(name),
                ),
                createElement(
                    'time',
                    { className: styles.time },
                    createText(time),
                ),
            ),
            createElement(
                'div',
                { className: styles.group },
                createElement(
                    'div',
                    { className: styles.message },
                    !unread
                        ? null
                        : createElement(
                            'div',
                            { className: styles.unread },
                            createText(unread.toString()),
                        ),
                ),
            ),
        ),
    );
}

export {
    ChatItem,
};
