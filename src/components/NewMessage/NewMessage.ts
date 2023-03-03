import { Button } from '../Button';
import { TextField } from '../TextField';
import attachIcon from '../../icons/attach.svg';
import sendIcon from '../../icons/send.svg';
import styles from './NewMessage.css';
import { createComponent, createElement } from '../../modules/vdom/createElement';
import { store } from '../../modules/store';
import { actions } from '../../modules/actions';

function Message() {
    const [message, setMessage] = this.useState('');

    function changeMessage(e: InputEvent) {
        const { value } = e.target as HTMLInputElement;
        setMessage(value);
    }

    return createElement(
        'div',
        {
            key: 'field',
            className: styles.field,
        },
        createElement(
            'div',
            {
                key: 'wrap',
                className: styles.wrap,
            },
            createComponent(
                TextField,
                {
                    key: 'message-field',
                    name: 'message',
                    placeholder: 'Сообщение',
                    onChange: changeMessage,
                },
            ),
        ),
        createElement(
            'div',
            {
                key: 'send',
                className: styles.send,
            },
            createComponent(
                Button,
                {
                    key: 'button',
                    icon: sendIcon,
                    click: () => message() && store.dispatch(actions.newMessage(message())),
                },
            ),
        ),
    );
}

function NewMessage() {
    const attachChange = (e: InputEvent) => {
        const input = e.target;
        // @ts-ignore
        store.dispatch(actions.sendFile((input as HTMLInputElement).files[0]));
    };

    return createElement(
        'div',
        {
            key: 'NewMessage',
            className: styles.form,
        },
        createElement(
            'label',
            {
                key: 'attach',
                className: styles.attach,
            },
            createElement(
                'img',
                {
                    src: attachIcon,
                    alt: 'attach',
                },
            ),
            createElement(
                'input',
                {
                    key: 'file',
                    className: styles.file,
                    id: 'attach',
                    type: 'file',
                    onchange: attachChange,
                },
            ),
        ),
        createComponent(
            Message,
            {
                key: 'message',
            },
        ),
    );
}

export {
    NewMessage,
};
