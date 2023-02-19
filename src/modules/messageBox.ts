import styles from '../pages/Pages/Pages.css';

const getMessagesRef = () => document.querySelector(`.${styles.messages}`) as HTMLElement | null;
const MAX_MESSAGES = 5;

function messageRemove(element:HTMLElement) {
    element.classList.add(styles.message_hidden);
    setTimeout(() => {
        element.remove();
    }, 300);
}

function showMessage(message: string) {
    const container = getMessagesRef();

    const messageElement = document.createElement('div');
    messageElement.classList.add(styles.message);
    messageElement.innerText = message;

    if (container) {
        container.appendChild(messageElement);

        if (container.children.length > MAX_MESSAGES) {
            messageRemove(container.children[0] as HTMLElement);
        }

        setTimeout(
            () => messageElement.classList.add(styles.message_show),
            10,
        );

        setTimeout(() => {
            messageRemove(messageElement);
        }, 3000);
    }
}

export {
    showMessage,
};
