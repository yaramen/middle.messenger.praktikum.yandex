import { className, html } from '../../modules/html';
import styles from './MessageList.css';
import oneIcon from '../../icons/one-send.svg';
import doubleIcon from '../../icons/double-send.svg';

function Message({
    actor, time, messageType, content, status,
}) {
    const isHtml = messageType === 'html';
    const isImage = messageType === 'image';

    const classes = className({
        [styles.message]: true,
        [styles['message-my']]: actor === 'my',
        [styles['message-contact']]: actor === 'contact',
        [styles['message-html']]: isHtml,
        [styles['message-image']]: isImage,
    });

    return html`
<div class="${classes}">
    ${isHtml && content}
    ${isImage && html`<img src="${content}" alt="time" />`}
    <time class="${styles.time}" datetime="${time}">${time.split(' ')[1]}</time>
    ${status && html`<img 
        class="${styles.status}"
        src="${status === 'send' ? doubleIcon : oneIcon}" 
        alt="send"
    />`}
</div>
`;
}

function MessageList(messages) {
    return html`
<div class="${styles.container}">
    ${Object.keys(messages).map((date) => html`
        <div class="${styles.wrapper}">
            <div class="${styles.dateline}">${date}</div>
            ${messages[date].map((message) => html(Message, message))}
        </div>
    `)}
</div>
`;
}

export {
    MessageList,
};
