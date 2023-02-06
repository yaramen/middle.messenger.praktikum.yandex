import { html } from '../../modules/html';
import { Sidebar } from '../../components/Sidebar';
import { Chat } from '../../components/Chat';
import { store } from '../../modules/store';
import { getMessages } from '../../api/mockApi';
import styles from './Messenger.css';
import { createComponent, createElement } from '../../modules/vdom/createElement';

const activeChatComputed = (state) => state.contactList.find((item) => state.chatId === item.id);

store.subscribe(async (oldState, newState) => {
    if (oldState.chatId !== newState.chatId && newState.chatId) {
        const messages = await getMessages(newState.chatId);
        const chatDom = document.querySelector('[data-ref="chat"]');
        if (chatDom) {
            chatDom.innerHTML = html(Chat, activeChatComputed(newState), messages);
        }
    }
});

function _Messenger() {
    const { contactList } = store.getState();
    const messages = null;

    return html`
<div class="${styles.container}">
    <div class="${styles.sidebar}">
        ${html(Sidebar, contactList)}
    </div>
    <div class="${styles.content}" data-ref="chat">
        ${html(Chat, activeChatComputed(store.getState()), messages)}
    </div>
</div>
`;
}

function Messenger() {
    const [contactList, setContactList] = this.useState([]);

    this.useEffect(() => {
        const unsubscribe = store.subscribe((oldState, newState) => {
            if (oldState.contactList !== newState.contactList) {
                setContactList(contactList);
            }
        });

        return unsubscribe;
    });

    return createElement(
        'div',
        { className: styles.container },
        createElement(
            'div',
            { className: styles.sidebar },
            createComponent(Sidebar, { contactList }),
        ),
        createElement(
            'div',
            { className: styles.content },
        ),
    );
}

export {
    Messenger,
};
