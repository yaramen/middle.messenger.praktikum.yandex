import { className } from '../../modules/html';
import styles from './MessageList.css';
import oneIcon from '../../icons/one-send.svg';
import doubleIcon from '../../icons/double-send.svg';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';
import { ChatMessage } from '../../types/model';
import { FileType } from '../FileType';
import { WebSocketService } from '../../api/WebSocketService';
import { formatTime } from '../../modules/date';

function Message({ message }: { message: ChatMessage }) {
    const {
        actor,
        time,
        type,
        content,
        is_read,
        file,
    } = message;

    const isHtml = type === 'message';
    const isFile = type === 'file';

    const classes = className({
        [styles.message]: true,
        [styles['message-my']]: actor === 'my',
        [styles['message-contact']]: actor === 'contact',
        [styles['message-vdom']]: isHtml,
        [styles['message-image']]: isFile,
    });

    return createElement(
        'div',
        { key: `message-${message.id}`, className: classes },
        !isHtml ? null : createElement('div', { innerHTML: content }),
        isFile && file ? createComponent(
            FileType,
            {
                key: file.id,
                file,
            },
        ) : null,
        createElement(
            'time',
            {
                className: styles.time,
                datetime: time,
            },
            createText(formatTime(new Date(time))),
        ),
        !is_read || actor !== 'my' ? null : createElement(
            'img',
            {
                className: styles.status,
                src: is_read ? doubleIcon : oneIcon,
                alt: 'send',
            },
        ),
    );
}

function MessageList({ messages }: { messages: ChatMessage[] }) {
    this.useEffectOnce(() => {
        this.onMount(() => {
            const element = this.getElement()?.parentElement;
            if (element) {
                element.addEventListener('scroll', () => {
                    if (element.scrollTop === 0) {
                        WebSocketService.getInstance()?.loadMessageMore(messages[0].id);
                    }
                });
            }
        });
    });

    return createElement(
        'div',
        { className: styles.container },
        createElement(
            'div',
            { className: styles.wrapper },
            ...messages.map((message, index) => createComponent(
                Message,
                {
                    key: `message-${index}`,
                    message,
                },
            )),
        ),
    );
}

export {
    MessageList,
};
