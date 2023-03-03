import styles from '../components/Chat/Chat.css';

const scrollChatToBottom = () => {
    const element = document.querySelector(`.${styles.content}`);
    if (element) {
        element.scrollTop = element.scrollHeight;
    }
};

const scrollToMessage = (messageId: number) => {
    const element = document.querySelector(`.${styles.content}`);
    if (element) {
        const message = document.querySelector(`[data-key=message-${messageId}]`);
        if (message && 'offsetTop' in message) {
            element.scrollTop = message.offsetTop as number;
        }
    }
};

export {
    scrollChatToBottom,
    scrollToMessage,
};
