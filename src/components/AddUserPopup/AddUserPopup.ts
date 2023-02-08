import { html } from '../../modules/html';
import { TextField } from '../TextField';
import { Button } from '../Button';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';
import styles from './AddUserPopup.css';
import { createComponent, createElement } from '../../modules/vdom/createElement';

function _AddUserPopup({
    closePopup,
}) {
    let userName = '';

    return html`
<div>
    <div class="${styles.field}">
        ${html(TextField, {
            placeholder: 'Имя пользователя',
            onChange: (value) => {
                userName = value;
            },
        })}
    </div>
    ${html(Button, {
        label: 'Добавить',
        click: () => {
            store.dispatch(actions.removeUser(userName));
            closePopup();
        },
    })}
</div>
        `;
}

function AddUserPopup({
    closePopup,
}) {
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
                        console.log(e.target);
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
                    console.log('add', userName);
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
