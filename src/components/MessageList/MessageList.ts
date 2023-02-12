import { className } from '../../modules/html';
import styles from './MessageList.css';
import oneIcon from '../../icons/one-send.svg';
import doubleIcon from '../../icons/double-send.svg';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';
import { Chat, ChatMessage } from '../../types/model';

function Message({ message }: { message: ChatMessage }) {
    const {
        actor,
        time,
        messageType,
        content,
        status,
    } = message;

    const isHtml = messageType === 'html';
    const isImage = messageType === 'image';

    const classes = className({
        [styles.message]: true,
        [styles['message-my']]: actor === 'my',
        [styles['message-contact']]: actor === 'contact',
        [styles['message-vdom']]: isHtml,
        [styles['message-image']]: isImage,
    });

    return createElement(
        'div',
        { className: classes },
        !isHtml ? null : createElement('div', { innerHTML: content }),
        !isImage ? null : createElement('img', { src: content, alt: 'time' }),
        createElement(
            'time',
            {
                className: styles.time,
                datetime: time,
            },
            createText(time.split(' ')[1]),
        ),
        !status ? null : createElement(
            'img',
            {
                className: styles.status,
                src: status === 'send' ? doubleIcon : oneIcon,
                alt: 'send',
            },
        ),
    );
}

function MessageList({ messages }: { messages: Chat }) {
    return createElement(
        'div',
        { className: styles.container },
        ...Object.keys(messages).map((date) => createElement(
            'div',
            { className: styles.wrapper },
            createElement(
                'div',
                { className: styles.dateline },
                createText(date),
            ),
            ...messages[date].map((message, index) => createComponent(
                Message,
                {
                    key: `message-${index}`,
                    message,
                },
            )),
        )),
    );
}

export {
    MessageList,
};
