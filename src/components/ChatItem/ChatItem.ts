import { Avatar } from '../Avatar';
import styles from './ChatItem.css';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';
import { ChatItemType } from '../../types/model';
import { formatTime } from '../../modules/date';

function ChatItem({
    id,
    title,
    avatar,
    unread_count,
    last_message,
}: ChatItemType) {
    return createElement(
        'div',
        {
            className: styles.item,
            onclick: () => store.dispatch(actions.chatChange(id)),
        },
        createElement(
            'div',
            { className: styles.avatar },
            createComponent(Avatar, {
                key: 'avatar',
                image: avatar || undefined,
                name: title,
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
                    createText(title),
                ),
                !last_message
                    ? null
                    : createElement(
                        'time',
                        { className: styles.time },
                        createText(formatTime(new Date(last_message.time))),
                    ),
            ),
            createElement(
                'div',
                { className: styles.group },
                createElement(
                    'div',
                    { className: styles.message },
                    !unread_count
                        ? null
                        : createElement(
                            'div',
                            { className: styles.unread },
                            createText(unread_count.toString()),
                        ),
                ),
            ),
        ),
    );
}

export {
    ChatItem,
};
