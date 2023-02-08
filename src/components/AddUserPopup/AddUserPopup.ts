import { TextField } from '../TextField';
import { Button } from '../Button';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';
import styles from './AddUserPopup.css';
import { createComponent, createElement } from '../../modules/vdom/createElement';

function AddUserPopup({
    closePopup,
}: { closePopup: () => void }) {
    const [userName, setUserName] = this.useState('');

    return createElement(
        'div',
        {
            key: 'add-user-popup',
        },
        createElement(
            'div',
            {
                key: 'textField',
                className: styles.field,
            },
            createComponent(
                TextField,
                {
                    key: 'field',
                    name: 'name',
                    placeholder: 'Имя пользователя',
                    onChange: (e: InputEvent) => {
                        setUserName((e.target as HTMLInputElement).value);
                    },
                },
            ),
        ),
        createComponent(
            Button,
            {
                key: 'button',
                label: 'Добавить',
                click: () => {
                    store.dispatch(actions.removeUser(userName));
                    closePopup();
                },
            },
        ),
    );
}

export {
    AddUserPopup,
};
