import { ChatItem } from '../ChatItem';
import { createComponent, createElement } from '../../modules/vdom/createElement';
import { Contact } from '../../types/model';

function ChatList({ contactList }: { contactList: Contact[] }) {
    return createElement(
        'ul',
        {},
        ...contactList.map((chatInfo) => createElement(
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
