import { ChatItem } from '../ChatItem';
import { createComponent, createElement } from '../../modules/vdom/createElement';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';
import { ChatListType } from '../../types/model';

function ChatList() {
    const [chatList, setChatList] = this.useState([]) as [() => ChatListType, (chatList: ChatListType) => void];

    this.useEffectOnce(() => {
        store.dispatch(actions.initMessagePage({}));
        const unsubscribe = store.subscribe((oldState, newState) => {
            if (oldState.chatList !== newState.chatList) {
                setChatList(newState.chatList);
            }
        });
        return () => {
            unsubscribe();
        };
    });

    const key = 'chat-list' + chatList().length;

    return createElement(
        'ul',
        {
            key,
        },
        ...chatList().map((chatInfo) => createElement(
            'li',
            {
                key: chatInfo.id,
            },
            createComponent(
                ChatItem,
                {
                    ...chatInfo,
                    key: chatInfo.id.toString(),
                },
            ),
        )),
    );
}

export {
    ChatList,
};
