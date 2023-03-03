import styles from './RemoveUserChat.css';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';
import { store } from '../../modules/store';
import { ChatService } from '../../api/ChatService';
import { User } from '../../types/model';
import { Button } from '../Button';
import { actions } from '../../modules/actions';

interface RemoveUserPopupProps {
    id: number,
    closePopup: () => void
}

function RemoveUserChat({
    id,
    closePopup,
}: RemoveUserPopupProps) {
    const [users, setUsers] = this.useState([]) as [() => User[], (users: User[]) => void];

    this.useEffectOnce(async () => {
        const { chatId } = store.getState();

        if (chatId) {
            const userList = await ChatService.userList(chatId);
            setUsers(userList.filter((user) => user.id !== store.getState().user?.id));
        }
    });

    if (!users().length) {
        return createElement(
            'div',
            {},
            createText('Список пуст'),
        );
    }

    return createElement(
        'div',
        { key: id },
        createElement(
            'div',
            { className: styles.name },
            ...users().map((user) => createElement(
                'div',
                {
                    key: user.id,
                    className: styles.user,
                },
                createElement(
                    'div',
                    { className: styles.login },
                    createText(user.login),
                ),
                createComponent(
                    Button,
                    {
                        key: user.id.toString(),
                        label: 'удалить',
                        click: () => {
                            store.dispatch(actions.removeUser({
                                chatId: store.getState().chatId,
                                userId: user.id,
                            }));
                            closePopup();
                        },
                    },
                ),
            )),
        ),
    );
}

export {
    RemoveUserChat,
};
